import { Router, type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/consts/httpStatus'
import { UserModel } from '@back/db/models/userModel'
import { createAccessToken, createRefreshToken } from '@back/utils/jwt'
import { setRefreshTokenCookie } from '@back/utils/headers'

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

export const resetPasswordRouter = Router()

const resetPassword: RouterHandler = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase()
    const resetPasswordKey = req.body.resetPasswordKey

    const user = await UserModel.findOne({ email, resetPasswordKey }).lean()

    if (!user) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'incorrect reset key' })

      return
    }

    if (!user.isActivated) {
      res.status(httpStatus.forbidden_403).json({ message: 'not activated' })

      return
    }

    const saltRounds = 10
    const password = await bcrypt.hash(req.body.password, saltRounds)
    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    const refreshJwtToken = createRefreshToken({ email, roles: user.roles })
    setRefreshTokenCookie({ res, refreshJwtToken })

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, resetPasswordKey },
      { password, refreshJwtToken, resetPasswordKey: '', loggedAt: Date.now() },
      { new: true },
    ).lean()

    res.status(httpStatus.created_201).json({
      message: 'password was reset',
      accessJwtToken,
      email: updatedUser?.email,
      roles: updatedUser?.roles,
    })
  } catch (error) {
    next(error)
  }
}

resetPasswordRouter.post('/', resetPassword)
