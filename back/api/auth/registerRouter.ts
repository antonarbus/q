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
import { nanoid } from '../../lib/nanoid'
import { sendEmail } from '../../services/email'
import type { Next, ReqWithBody, ResWithBody } from '../../types'
import { config } from '@back/config'

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  message:
    | 'validation error'
    | 'already exists'
    | 'activation link sent'
    | 'activation link not sent'
    | 'activation key not issued'
  validationErrors?: Result<ValidationError>
}

export const registerRouter = express.Router()

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

const register: RouterHandler = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    const isValidationError = !validationErrors.isEmpty()

    if (isValidationError) {
      return res.status(httpStatus.forbidden_403).json({
        message: 'validation error',
        validationErrors,
      })
    }

    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email, isActivated: true }).lean()

    if (user) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'already exists' })
    }

    const saltRounds = 10
    const password = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = await UserModel.findOneAndUpdate(
      { email },
      { password, activationKey: nanoid(5) },
      { new: true, upsert: true },
    )

    const activationKey = newUser.activationKey

    if (!activationKey) {
      return res
        .status(httpStatus.serverError_500)
        .json({ message: 'activation key not issued' })
    }

    const emailRes = await sendEmail({
      to: email,
      subject: 'Activate your account',
      html: `
        <p>Follow the link to activate the account.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${config.front.baseUrl}/activate/${activationKey}"
          >
            ${config.front.baseUrl}/activate/${activationKey}
          </a>
        </p>
      `,
    })

    if (emailRes?.[0].statusCode === 202) {
      return res
        .status(httpStatus.created_201)
        .json({ message: 'activation link sent' })
    }

    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'activation link not sent' })
  } catch (error) {
    next(error)
  }
}

registerRouter.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  (req, res, next) => {
    void register(req, res, next)
  },
)
