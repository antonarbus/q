import type { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/shared/consts/httpStatus'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/libs/jwt'
import { setRefreshTokenCookie } from '@back/shared/headers'
import { UserModel } from '@back/entities/user'

export type ReqBody = {
  email: User['email']
  password: User['password']
  resetPasswordKey: User['resetPasswordKey']
}

export type ResBody = {
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
  message:
    | 'validation error'
    | 'incorrect reset key'
    | 'not activated'
    | 'password was reset'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const resetPasswordHandler: RouterHandler = async (req, res, next) => {
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

  const accessJwtToken = generateAccessToken({
    email: emailFromInput,
    roles: user.roles,
  })

  const refreshJwtToken = generateRefreshToken({
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
    email: updatedUser?.email,
    roles: updatedUser?.roles,
  })
}
