import { usersTable } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import type { User } from '@entities/user/type'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'

export type ReqBody = {
  email: User['email']
  password: User['password']
  resetPasswordKey: User['resetPasswordKey']
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email?: User['email']
  roles?: User['roles']
  message: 'password was reset'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'incorrect reset key' | 'not activated'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const resetPasswordHandler: RouterHandler = async (req, res, _next) => {
  const emailFromInput = req.body.email.toLowerCase()
  const passwordFromInput = req.body.password
  const resetPasswordKeyFromInput = req.body.resetPasswordKey

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.resetPasswordKey, resetPasswordKeyFromInput),
      ),
    )

  if (userSelected === undefined) {
    res
      .status(httpStatusCode.forbidden403)
      .json({ message: 'incorrect reset key' })

    return
  }

  if (userSelected.isActivated === false) {
    res.status(httpStatusCode.forbidden403).json({ message: 'not activated' })

    return
  }

  const saltRounds = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)

  const accessToken = generateAccessToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  const refreshToken = generateRefreshToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      password: passwordEncrypted,
      refreshJwtToken: refreshToken.value,
      resetPasswordKey: '',
      loggedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.resetPasswordKey, resetPasswordKeyFromInput),
      ),
    )
    .returning()

  res.status(httpStatusCode.created201).json({
    message: 'password was reset',
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    email: userUpdated?.email,
    roles: userUpdated?.roles,
  })
}
