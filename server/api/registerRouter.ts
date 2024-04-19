import bcrypt from 'bcryptjs'
import express from 'express'
import { type Result, type ValidationError, body, validationResult } from 'express-validator'
import { type User } from '@entities/user'
import { httpStatus } from '@shared/consts/httpStatus'
import { nanoid } from '@shared/lib/nanoid'
import { UserModel } from '../db/models/userModel'
// import { apiUrl } from '../consts/apiUrl'
// import { sendMail } from '../services/mail/sendMail'
import type { Next, ReqWithBody, ResWithBody } from '../types'
// const domain = process.env.DOMAIN
// const port = process.env.PORT_FRONT_END

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  message: 'validation error' | 'already exists' | 'activation link sent'
  validationErrors?: Result<ValidationError>
}

export const registerRouter = express.Router()

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

const register: RouterHandler = async (req, res, next) => {
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

    const user = await UserModel.findOne({ email }).lean()

    if (user) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'already exists' })
    }

    const password = await bcrypt.hash(req.body.password, 10)
    const activationKey = nanoid(5)

    await UserModel.create({ email, password, activationKey })

    // todo
    // send email with activation link
    // const subject = 'Activation for quotation.app'
    // const activationLink = `${domain}:${port}${apiUrl.activate}/${activationKey}`
    // const html = `<div><h1>Follow the link to confirm the registration</h1><a href="${activationLink}">${activationLink}</a></div> `
    // await sendMail({ to: email, subject, html })

    return res
      .status(httpStatus.created_201)
      .json({ message: 'activation link sent' })
  } catch (error) {
    next(error)
  }
}

registerRouter.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  register,
)
