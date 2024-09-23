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
import { nanoid } from '../../lib/nanoid'
import { sendEmail } from '../../services/email'
import type { Next, ReqWithBody, ResWithBody } from '../../types'
import { baseUrlFront } from '../../utils/env'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message:
    | 'validation error'
    | 'does not exists'
    | 'reset link sent'
    | 'account not activated'
    | 'reset key not issued'
    | 'reset link not sent'
  validationErrors?: Result<ValidationError>
}

export const requestPasswordResetRouter = express.Router()

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

const requestPasswordReset: RouterHandler = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    const isValidationError = !validationErrors.isEmpty()

    if (isValidationError) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'validation error', validationErrors })
    }

    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email }).lean()

    if (!user) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'does not exists' })
    }

    if (!user.isActivated) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'account not activated' })
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { resetPasswordKey: nanoid(5) },
      { new: true },
    )

    const resetPasswordKey = updatedUser?.resetPasswordKey

    if (!resetPasswordKey) {
      return res
        .status(httpStatus.serverError_500)
        .json({ message: 'reset key not issued' })
    }

    const emailRes = await sendEmail({
      to: email,
      subject: 'password reset',
      html: `
        <p>Follow the link to reset the password.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${baseUrlFront}/reset-password/${email}/${resetPasswordKey}"
          >
            ${baseUrlFront}/reset-password/${email}/${resetPasswordKey}
          </a>
        </p>
      `,
    })

    if (emailRes?.[0].statusCode === 202) {
      return res
        .status(httpStatus.created_201)
        .json({ message: 'reset link sent' })
    }

    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'reset link not sent' })
  } catch (error) {
    next(error)
  }
}

requestPasswordResetRouter.post(
  '/',
  body('email').isEmail(),
  (req, res, next) => {
    void requestPasswordReset(req, res, next)
  },
)
