import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
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

export type ReqBody = {
  email: InsertUser['email']
  password: InsertUser['password']
}

export type ResBody = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  email: SelectUser['email']
  roles: SelectUser['roles']
  message: 'activation link sent'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'already exists'
    | 'activation link not sent'
    | 'activation key not issued'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const registerUserHandler: RouterHandler = async (req, res, _next) => {
  const emailFromInput = req.body.email.toLowerCase()
  const passwordFromInput = req.body.password

  const [selectedUser] = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.isActivated, true),
      ),
    )

  if (selectedUser !== undefined) {
    res.status(httpStatus.forbidden403).json({
      message: 'already exists',
    })

    return
  }

  const saltRounds = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)
  const activationKey = generateId()

  const refreshToken = generateRefreshToken({
    email: emailFromInput,
    roles: [userRole.user],
  })

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [insertedUser] = await db
    .insert(usersTable)
    .values({
      email: emailFromInput,
      password: passwordEncrypted,
      activationKey,
      refreshJwtToken: refreshToken.value,
    })
    .returning()

  if (insertedUser === undefined) {
    res.status(httpStatus.serverError500).json({
      message: 'Internal error',
    })

    return
  }

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
    res.status(httpStatus.created201).json({
      message: 'activation link sent',
      email: emailFromInput,
      roles: [userRole.user],
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
    })

    return
  }

  res.status(httpStatus.serverError500).json({
    message: 'activation link not sent',
  })
}
