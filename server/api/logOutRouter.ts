import { Router } from 'express'
import { jwtDecode } from 'jwt-decode'
import { httpStatus } from '@shared/consts/httpStatus'
import { UserModel } from '../db/models/userModel'
import type { JwtPayloadExtended } from '../services/jwt'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  message: 'token not found' | 'user not found' | 'no user in db' | 'logged out'
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const logOutRouter = Router()

const logOut: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'token not found' })
    }

    const { email } = jwtDecode<JwtPayloadExtended>(refreshJwtToken)

    if (!email) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'user not found' })
    }

    res.clearCookie('refreshJwtToken')
    // * let's not remove refreshJwtToken from db as it may be used by other devices
    // const user = await UserModel.findOne({ refreshJwtToken })

    // if (!user) {
    //   return res
    //     .status(httpStatus.forbidden_403)
    //     .json({ message: 'no user in db' })
    // }

    // user.refreshJwtToken = ''
    // await user.save()

    return res
      .status(httpStatus.success_200)
      .json({ message: 'logged out' })
  } catch (error) {
    next(error)
  }
}

logOutRouter.get('/', logOut)
