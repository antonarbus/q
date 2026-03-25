import {
  usersTable,
  type SelectUser,
} from '@back/entity/user/db/usersTableSchema'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import type { NextFunction, Request, Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: SelectUser['email']
}

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'USER_NOT_FOUND'
    | 'ACCOUNT_NOT_ACTIVATED'
    | 'RESET_KEY_NOT_ISSUED'
    | 'RESET_LINK_NOT_SENT'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const requestPasswordResetHandler: RouterHandler = async (req) => {
  const messageList: string[] = []

  const emailFromInput = req.body.email.toLowerCase()

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailFromInput))

  if (userSelected === undefined) {
    messageList.push('User not found')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'USER_NOT_FOUND',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('User found')

  if (userSelected.isActivated === false) {
    messageList.push('Account not activated')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ACCOUNT_NOT_ACTIVATED',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Account activation verified')

  const resetPasswordKey = generateId()

  const [userUpdated] = await db
    .update(usersTable)
    .set({ resetPasswordKey })
    .where(eq(usersTable.email, emailFromInput))
    .returning()

  if (userUpdated === undefined) {
    messageList.push('Failed to issue reset key')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'RESET_KEY_NOT_ISSUED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Reset key generated')

  const emailRes = await sendEmail({
    to: emailFromInput,
    subject: 'Password reset',
    html: `
        <p>Follow the link to reset the password.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${runtimeConfig.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}"
          >
            ${runtimeConfig.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}
          </a>
        </p>
      `,
  })

  // https://developers.mailersend.com/general.html#api-response
  if (emailRes.statusCode === 202) {
    messageList.push('Reset email sent successfully')

    return httpJsonResponse({
      statusCode: httpStatusCode.created201,
      body: {
        message: messageList.join(' | '),
      },
    })
  }

  messageList.push('Failed to send reset email')

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'RESET_LINK_NOT_SENT',
    statusCode: httpStatusCode.serverError500,
    message: messageList.join(' | '),
  })
}
