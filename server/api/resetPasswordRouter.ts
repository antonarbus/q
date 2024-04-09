import { createAccessToken, createRefreshToken, thirtyDaysInSec } from '@server/services/jwt'
import bcrypt from 'bcryptjs'
import express from 'express'
import { type Result, type ValidationError, body, validationResult } from 'express-validator'
import { httpStatus } from '@shared/consts/httpStatus'
// import { nanoid } from '@shared/lib/nanoid'
import { UserModel } from '../db/models/userModel'
// import { apiUrl } from '../consts/apiUrl'
// import { sendMail } from '../services/mail/sendMail'
import type { Next, ReqWithBody, ResWithBody } from '../types'
// const domain = process.env.DOMAIN
// const port = process.env.PORT_FRONT_END

export type ReqBody = {
  email: string
  password: string
  resetPasswordKey: string
}

export type ResBody = {
  message: 'validation error' | 'incorrect reset key' | 'not activated' | 'password was reset'
  validationErrors?: Result<ValidationError>
  accessJwtToken?: string
  email?: string
  roles?: string[]
}

export const resetPasswordRouter = express.Router()

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

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

    const user = await UserModel.findOne({ email, resetPasswordKey })

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

    const password = await bcrypt.hash(req.body.password, 10)
    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    const refreshJwtToken = createRefreshToken({ email, roles: user.roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    const document = await UserModel.findOneAndUpdate(
      { email, resetPasswordKey },
      { password, refreshJwtToken, resetPasswordKey: '' },
      { new: true },
    )

    return res
      .status(httpStatus.created_201)
      .json({
        message: 'password was reset',
        accessJwtToken,
        email: document?.email,
        roles: document?.roles,
      })
  } catch (error) {
    next(error)
  }
}

resetPasswordRouter.post(
  '/',
  body('password').isLength({ min: 3 }),
  resetPassword,
)
