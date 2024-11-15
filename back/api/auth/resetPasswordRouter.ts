import bcrypt from 'bcryptjs'
import express from 'express'
import {
  type Result,
  type ValidationError,
  body,
  validationResult,
} from 'express-validator'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import {
  createAccessToken,
  createRefreshToken,
  threeMonthsInSec,
} from '../../utils/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../../types'

export type ReqBody = {
  email: User['email']
  password: User['password']
  resetPasswordKey: User['resetPasswordKey']
}

export type ResBody = {
  message:
    | 'validation error'
    | 'incorrect reset key'
    | 'not activated'
    | 'password was reset'
  validationErrors?: Result<ValidationError>
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
}

export const resetPasswordRouter = express.Router()

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

const resetPassword: RouterHandler = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    const isValidationError = !validationErrors.isEmpty()

    if (isValidationError) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'validation error', validationErrors })
    }

    const email = req.body.email.toLowerCase()
    const resetPasswordKey = req.body.resetPasswordKey

    const user = await UserModel.findOne({ email, resetPasswordKey }).lean()

    if (!user) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'incorrect reset key' })
    }

    if (!user.isActivated) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not activated' })
    }

    const saltRounds = 10
    const password = await bcrypt.hash(req.body.password, saltRounds)
    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    const refreshJwtToken = createRefreshToken({ email, roles: user.roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: threeMonthsInSec * 1000,
    })

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, resetPasswordKey },
      { password, refreshJwtToken, resetPasswordKey: '', loggedAt: Date.now() },
      { new: true },
    ).lean()

    return res.status(httpStatus.created_201).json({
      message: 'password was reset',
      accessJwtToken,
      email: updatedUser?.email,
      roles: updatedUser?.roles,
    })
  } catch (error) {
    next(error)
  }
}

resetPasswordRouter.post(
  '/',
  body('password').isLength({ min: 3 }),
  (req, res, next) => {
    void resetPassword(req, res, next)
  },
)
