import bcrypt from 'bcryptjs'
import express from 'express'
import { body, validationResult } from 'express-validator'
import { httpStatus } from '@shared/consts/httpStatus'
import { nanoid } from '@shared/lib/nanoid'
import { apiUrl } from '../consts/apiUrl'
import { UserModel } from '../db/models/userModel'
// import { sendMail } from '../services/mail/sendMail'
import type { Next, ReqWithBody, Res } from '../types'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export type ReqBody = {
  email: string
  password: string
}

export type ResBody = {
  message: 'validation error' | 'already exists' | 'activation link sent'
  validationErrors?: string
}

export const registerRouter = express.Router()

registerRouter.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 1 }),
  async (req: ReqWithBody<ReqBody>, res: Res, next: Next) => {
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

      if (user) {
        return res
          .status(httpStatus.forbidden_403)
          .json({ message: 'already exists' })
      }

      const password = await bcrypt.hash(req.body.password, 10)
      const activationLink = `${domain}:${port}${apiUrl.activate}/${nanoid(5)}`

      await UserModel.create({ email, password, activationLink })

      // send email with activation link
      // const subject = 'Activation for quotation.app'
      // const html = `<div><h1>Follow the link to confirm the registration</h1><a href="${activationLink}">${activationLink}</a></div> `
      // await sendMail({ to: email, subject, html })

      return res
        .status(httpStatus.created_201)
        .json({ message: 'activation link sent' })
    } catch (error) {
      next(error)
    }
  },
)
