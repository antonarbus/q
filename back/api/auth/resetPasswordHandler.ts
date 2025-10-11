import { UserModel } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import type { User } from '@entities/user'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'

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

  const user = await UserModel.findOne({
    email: emailFromInput,
    resetPasswordKey: resetPasswordKeyFromInput,
  }).lean()

  if (user === null) {
    res
      .status(httpStatus.forbidden_403)
      .json({ message: 'incorrect reset key' })

    return
  }

  if (user.isActivated === false) {
    res.status(httpStatus.forbidden_403).json({ message: 'not activated' })

    return
  }

  const saltRounds = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)

  const { accessJwtToken, accessJwtTokenExpiresOn } = generateAccessToken({
    email: emailFromInput,
    roles: user.roles,
  })

  const { refreshJwtToken } = generateRefreshToken({
    email: emailFromInput,
    roles: user.roles,
  })

  setRefreshTokenCookie({ res, refreshJwtToken })

  const updatedUser = await UserModel.findOneAndUpdate(
    { email: emailFromInput, resetPasswordKey: resetPasswordKeyFromInput },
    {
      password: passwordEncrypted,
      refreshJwtToken,
      resetPasswordKey: '',
      loggedAt: Date.now(),
    },
    { new: true },
  ).lean()

  res.status(httpStatus.created_201).json({
    message: 'password was reset',
    accessJwtToken,
    accessJwtTokenExpiresOn,
    email: updatedUser?.email,
    roles: updatedUser?.roles,
  })
}
