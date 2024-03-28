import express from 'express'
import { type Result, type ValidationError, body, validationResult } from 'express-validator'
import { httpStatus } from '@shared/consts/httpStatus'
import { nanoid } from '@shared/lib/nanoid'
import { apiUrl } from '../consts/apiUrl'
import { UserModel } from '../db/models/userModel'
// import { sendMail } from '../services/mail/sendMail'
import type { Next, ReqWithBody, ResWithBody } from '../types'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export type ReqBody = {
  email: string
}

export type ResBody = {
  message: 'validation error' | 'does not exists' | 'reset link sent'
  validationErrors?: Result<ValidationError>
  resetLink?: string
}

export const resetRouter = express.Router()

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

const reset: RouterHandler = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    const isValidationError = !validationErrors.isEmpty()

    if (isValidationError) {
      return res
        .status(httpStatus.forbidden_403)
        .json({
          message: 'validation error',
          validationErrors,
        })
    }

    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'does not exists' })
    }

    const filter = { email }
    const update = { resetLink: `${domain}:${port}${apiUrl.activate}/${nanoid(5)}` }

    const document = await UserModel.findOneAndUpdate(filter, update, { new: true })

    // send email with activation link
    // const subject = 'Activation for quotation.app'
    // const html = `<div><h1>Follow the link to confirm the registration</h1><a href="${activationLink}">${activationLink}</a></div> `
    // await sendMail({ to: email, subject, html })

    return res
      .status(httpStatus.created_201)
      .json({
        message: 'reset link sent',
        resetLink: document?.resetLink,
      })
  } catch (error) {
    next(error)
  }
}

resetRouter.post(
  '/',
  body('email').isEmail(),
  reset,
)
