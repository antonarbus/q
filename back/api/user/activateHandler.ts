import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import type { NextFunction, Request, Response } from 'express'
import { usersTable, type SelectUser } from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'

export type ReqBody = {
  activationKey: NonNullable<SelectUser['activationKey']>
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email?: SelectUser['email']
  roles?: SelectUser['roles']
  message: 'already activated' | 'activated'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'activation key not found'
    | 'failed to activate'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const activateHandler: RouterHandler = async (req, res, _next) => {
  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.activationKey, req.body.activationKey))

  if (userSelected === undefined) {
    res
      .status(httpStatus.badRequest400)
      .json({ message: 'activation key not found' })

    return
  }

  if (userSelected.isActivated === true) {
    res.status(httpStatus.success200).json({ message: 'already activated' })

    return
  }

  const refreshToken = generateRefreshToken({
    email: userSelected.email,
    roles: userSelected.roles,
  })

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      refreshJwtToken: refreshToken.value,
      isActivated: true,
      loggedAt: new Date(),
    })
    .where(
      and(
        eq(usersTable.activationKey, req.body.activationKey),
        eq(usersTable.email, userSelected.email),
      ),
    )
    .returning()

  if (userUpdated === undefined) {
    res
      .status(httpStatus.serverError500)
      .json({ message: 'failed to activate' })

    return
  }

  const accessToken = generateAccessToken({
    email: userUpdated.email,
    roles: userUpdated.roles,
  })

  res.status(httpStatus.success200).json({
    message: 'activated',
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    email: userUpdated.email,
    roles: userUpdated.roles,
  })
}
