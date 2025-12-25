import { usersTable } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import type { User } from '@entities/user/type'
import type { NextFunction, Request, Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message: 'reset link sent'
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCodeCommon
    | 'USER_NOT_FOUND'
    | 'ACCOUNT_NOT_ACTIVATED'
    | 'RESET_KEY_NOT_ISSUED'
    | 'RESET_LINK_NOT_SENT'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const requestPasswordResetHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const emailFromInput = req.body.email.toLowerCase()

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailFromInput))

  if (userSelected === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'USER_NOT_FOUND',
      statusCode: httpStatusCode.forbidden403,
      message: 'User not found',
    })
  }

  if (userSelected.isActivated === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ACCOUNT_NOT_ACTIVATED',
      statusCode: httpStatusCode.forbidden403,
      message: 'Account not activated',
    })
  }

  const resetPasswordKey = generateId()

  const [userUpdated] = await db
    .update(usersTable)
    .set({ resetPasswordKey })
    .where(eq(usersTable.email, emailFromInput))
    .returning()

  if (userUpdated === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'RESET_KEY_NOT_ISSUED',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to issue reset key',
    })
  }

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
    res.status(httpStatusCode.created201).json({ message: 'reset link sent' })

    return
  }

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'RESET_LINK_NOT_SENT',
    statusCode: httpStatusCode.serverError500,
    message: 'Failed to send reset link',
  })
}
