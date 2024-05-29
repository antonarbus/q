import sgMail from '@sendgrid/mail'
import { isProd } from '@server/utils/env'
import express from 'express'
import {
  type Result,
  type ValidationError,
  body,
  validationResult,
} from 'express-validator'
import { type User } from '@entities/user'
import { httpStatus } from '@shared/consts/httpStatus'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { UserModel } from '../../db/models/userModel'
import type { Next, ReqWithBody, ResWithBody } from '../../types'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message:
    | 'validation error'
    | 'does not exists'
    | 'reset link sent'
    | 'reset key not issued'
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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    const domain = process.env[isProd ? 'DOMAIN_PROD' : 'DOMAIN_DEV']!

    const sendEmailRes = await sgMail.send({
      from: 'info@quotation.app',
      replyTo: 'info@quotation.app',
      to: email,
      subject: 'password reset',
      html: `
        <p>Follow the link to reset the password.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${domain}/${route.resetPassword}/${email}/${resetPasswordKey}"
          >
            ${domain}/${route.resetPassword}/${email}/${resetPasswordKey}
          </a>
        </p>
      `,
      text: `
        Please follow the link to reset the password.
        ${domain}/${route.resetPassword}/${email}/${resetPasswordKey}
      `,
    })

    console.log('🚀 ~ sendEmailRes:', sendEmailRes)

    return res
      .status(httpStatus.created_201)
      .json({ message: 'reset link sent' })
  } catch (error) {
    next(error)
  }
}

requestPasswordResetRouter.post(
  '/',
  body('email').isEmail(),
  requestPasswordReset,
)
