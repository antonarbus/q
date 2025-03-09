import { Router, type Request, type Response, type NextFunction } from 'express'
import type { User } from '@entities/user'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/consts/httpStatus'
import { UserModel } from '@back/db/models/userModel'
import { createAccessToken, createRefreshToken } from '@back/utils/jwt'
import { setRefreshTokenCookie } from '@back/utils/headers'

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

export const activateRouter = Router()

const activate: RouterHandler = async (req, res, next) => {
  try {
    const activationKey = req.body.activationKey

    const user = await UserModel.findOne({ activationKey })

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

    const refreshJwtToken = createRefreshToken({ email, roles })
    setRefreshTokenCookie({ res, refreshJwtToken })

    const userDocument = await UserModel.findOneAndUpdate(
      { email, activationKey },
      { refreshJwtToken, isActivated: true, loggedAt: Date.now() },
      { new: true },
    ).lean()

    res.status(httpStatus.success_200).json({
      message: 'activated',
      accessJwtToken: createAccessToken({ email, roles }),
      email: userDocument?.email,
      roles: userDocument?.roles,
    })
  } catch (error) {
    next(error)
  }
}

activateRouter.post('/', activate)
