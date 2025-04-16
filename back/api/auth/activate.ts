import type { Request, Response, NextFunction } from 'express'
import type { User } from '@entities/user'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { generateAccessToken, generateRefreshToken } from '@back/shared/lib/jwt'
import { setRefreshTokenCookie } from '@back/shared/headers'
import { UserModel } from '@back/entities/user'

export type ReqBody = {
  activationKey: User['activationKey']
}

export type ResBody = {
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
  message:
    | ErrorMessageCommon
    | 'activation key not found'
    | 'already activated'
    | 'activated'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const activate: RouterHandler = async (req, res, next) => {
  const activationKeyFromInput = req.body.activationKey

  const user = await UserModel.findOne({
    activationKey: activationKeyFromInput,
  })

  if (!user) {
    res
      .status(httpStatus.badRequest_400)
      .json({ message: 'activation key not found' })

    return
  }

  const { email, roles, isActivated } = user

  if (isActivated) {
    res.status(httpStatus.success_200).json({ message: 'already activated' })

    return
  }

  const refreshJwtToken = generateRefreshToken({ email, roles })
  setRefreshTokenCookie({ res, refreshJwtToken })

  const userDocument = await UserModel.findOneAndUpdate(
    { email, activationKey: activationKeyFromInput },
    { refreshJwtToken, isActivated: true, loggedAt: Date.now() },
    { new: true },
  ).lean()

  res.status(httpStatus.success_200).json({
    message: 'activated',
    accessJwtToken: generateAccessToken({ email, roles }),
    email: userDocument?.email,
    roles: userDocument?.roles,
  })
}
