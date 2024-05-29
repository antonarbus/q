import sgMail from '@sendgrid/mail'
import { sendEmail } from '@server/services/mail'
import express from 'express'
import {
  type Result,
  type ValidationError,
  body,
  validationResult,
} from 'express-validator'
import { type User } from '@entities/user'
import { httpStatus } from '@shared/consts/httpStatus'
import { nanoid } from '@shared/lib/nanoid'
import { UserModel } from '../../db/models/userModel'
import type { Next, ReqWithBody, ResWithBody } from '../../types'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message: 'validation error' | 'does not exists' | 'reset link sent'
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

    const resetPasswordKey =  nanoid(5)

    const dbRes = await UserModel.findOneAndUpdate(
      { email },
      { resetPasswordKey },
      { new: true },
    )
    // todo: check if we got the response and use key from there
    console.log('🚀 ~ dbRes:', dbRes)


    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    const sendEmailRes = await sgMail.send({
      from: 'info@quotation.app',
      replyTo: 'info@quotation.app',
      to: email,
      subject: 'password reset',
      html: `
        <p>You have requested to reset your password. If you haven't, just ignore this message.</p>
        <p>Follow the link to reset the password.</p>
        <p><a clicktracking="off" href="https://quotation.app/reset/${resetPasswordKey}">https://quotation.app/reset/${resetPasswordKey}</a></p>
      `,
      text: `
        You have requested to reset your password. If you haven't, just ignore this message.
        Please follow the link to reset the password.
        https://quotation.app/reset/${resetPasswordKey}
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
