import { UserModel } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import type { User } from '@entities/user/type'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  activationKey: User['activationKey']
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email?: User['email']
  roles?: User['roles']
  message: 'already activated' | 'activated'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'activation key not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const activateHandler: RouterHandler = async (req, res, _next) => {
  const activationKeyFromInput = req.body.activationKey

  const user = await UserModel.findOne({
    activationKey: activationKeyFromInput,
  })

  if (user === null) {
    res
      .status(httpStatus.badRequest_400)
      .json({ message: 'activation key not found' })

    return
  }

  const { email, roles, isActivated } = user

  if (isActivated === true) {
    res.status(httpStatus.success_200).json({ message: 'already activated' })

    return
  }

  const { refreshJwtToken } = generateRefreshToken({ email, roles })
  setRefreshTokenCookie({ res, refreshJwtToken })

  const userDocument = await UserModel.findOneAndUpdate(
    { email, activationKey: activationKeyFromInput },
    { refreshJwtToken, isActivated: true, loggedAt: Date.now() },
    { new: true },
  ).lean()

  const { accessJwtToken, accessJwtTokenExpiresOn } = generateAccessToken({
    email,
    roles,
  })

  res.status(httpStatus.success_200).json({
    message: 'activated',
    accessJwtToken,
    accessJwtTokenExpiresOn,
    email: userDocument?.email,
    roles: userDocument?.roles,
  })
}
