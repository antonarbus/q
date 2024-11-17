import { Router, type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import { nanoid } from '../../lib/nanoid'
import { sendEmail } from '../../services/email'
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
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const registerRouter = Router()

const register: RouterHandler = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email, isActivated: true }).lean()

    if (user) {
      res.status(httpStatus.forbidden_403).json({ message: 'already exists' })

      return
    }

    const saltRounds = 10
    const password = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = await UserModel.findOneAndUpdate(
      { email },
      { password, activationKey: nanoid(5), registeredAt: new Date() },
      { new: true, upsert: true },
    )

    const activationKey = newUser.activationKey

    if (!activationKey) {
      res
        .status(httpStatus.serverError_500)
        .json({ message: 'activation key not issued' })

      return
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
      res
        .status(httpStatus.created_201)
        .json({ message: 'activation link sent' })

      return
    }

    res
      .status(httpStatus.serverError_500)
      .json({ message: 'activation link not sent' })
  } catch (error) {
    next(error)
  }
}

registerRouter.post('/', register)
