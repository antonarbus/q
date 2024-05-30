import express from 'express'
import { type User } from '@entities/user'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import {
  createAccessToken,
  createRefreshToken,
  thirtyDaysInSec,
} from '../../services/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../../types'

export type ReqBody = {
  activationKey: User['activationKey']
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'activation key not found'
    | 'already activated'
    | 'activated'
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const activateRouter = express.Router()

const activate: RouterHandler = async (req, res, next) => {
  try {
    const activationKey = req.body.activationKey

    const user = await UserModel.findOne({ activationKey })

    if (!user) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: 'activation key not found' })
    }

    const { email, roles, isActivated } = user

    if (isActivated) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'already activated' })
    }

    const accessJwtToken = createAccessToken({ email, roles })
    const refreshJwtToken = createRefreshToken({ email, roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    const document = await UserModel.findOneAndUpdate(
      { email, activationKey },
      { refreshJwtToken, isActivated: true },
      { new: true },
    ).lean()

    return res.status(httpStatus.success_200).json({
      message: 'activated',
      accessJwtToken,
      email: document?.email,
      roles: document?.roles,
    })
  } catch (error) {
    next(error)
  }
}

activateRouter.post('/', activate)
