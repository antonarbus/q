import { httpStatusCode } from '@back/shared/const/httpCode'
import { userRole } from '@back/shared/const/userRole'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import {
  usersTable,
  type InsertUser,
  type SelectUser,
} from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: InsertUser['email']
  password: InsertUser['password']
}

export type ResBody = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  email: SelectUser['email']
  roles: SelectUser['roles']
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'ALREADY_EXISTS'
    | 'ACTIVATION_LINK_NOT_SENT'
    | 'ACTIVATION_KEY_NOT_ISSUED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const registerUserHandler: RouterHandler = async (req, res) => {
  const emailFromInput = req.body.email.toLowerCase()
  const passwordFromInput = req.body.password

  const messageList: string[] = []

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.isActivated, true),
      ),
    )

  if (userSelected !== undefined) {
    messageList.push('User already exists')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ALREADY_EXISTS',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Email available for registration')

  const SALT_ROUNDS = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, SALT_ROUNDS)
  const activationKey = generateId()

  const refreshToken = generateRefreshToken({
    email: emailFromInput,
    roles: [userRole.user],
  })

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [userInserted] = await db
    .insert(usersTable)
    .values({
      email: emailFromInput,
      password: passwordEncrypted,
      activationKey,
      refreshJwtToken: refreshToken.value,
    })
    .returning()

  if (userInserted === undefined) {
    messageList.push('Failed to create user in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INTERNAL_ERROR',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('User created in database')

  const emailRes = await sendEmail({
    to: emailFromInput,
    subject: 'Confirm your email',
    html: `
        <p>Follow the link to confirm your email.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${runtimeConfig.front.baseUrl}/activate/${activationKey}"
          >
            ${runtimeConfig.front.baseUrl}/activate/${activationKey}
          </a>
        </p>
      `,
  })

  const accessToken = generateAccessToken({
    email: emailFromInput,
    roles: [userRole.user],
  })

  // https://developers.mailersend.com/general.html#api-response
  if (emailRes.statusCode === 202) {
    messageList.push('Activation email sent successfully')

    res.status(httpStatusCode.created201).json({
      email: emailFromInput,
      roles: [userRole.user],
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
      message: messageList.join(' | '),
    })

    return
  }

  messageList.push('Failed to send activation email')

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'ACTIVATION_LINK_NOT_SENT',
    statusCode: httpStatusCode.serverError500,
    message: messageList.join(' | '),
  })
}
