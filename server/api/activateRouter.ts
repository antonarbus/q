import express from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import { UserModel } from '../db/models/userModel'
import { createAccessToken, createRefreshToken, thirtyDaysInSec } from '../services/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../types'

export type ReqBody = {
  activationKey: string
}

export type ResBody = {
  message: 'activation key not found' | 'already activated' | 'activated'
  accessJwtToken?: string
  email?: string
  roles?: string[]
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

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

    await UserModel.findOneAndUpdate(
      { email, activationKey },
      { refreshJwtToken, isActivated: true, activationKey: '' },
    )

    return res
      .status(httpStatus.success_200)
      .json({
        message: 'activated',
        accessJwtToken,
        email,
        roles,
      })
  } catch (error) {
    next(error)
  }
}

activateRouter.post('/', activate)
