import { Router, type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { nanoid } from '@back/shared/lib/nanoid'
import { sendEmail } from '@back/shared/services/email'
import { config } from '@back/config'
import { UserModel } from '@back/entities/user'

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
    const emailFromInput = req.body.email.toLowerCase()
    const passwordFromInput = req.body.password

    const user = await UserModel.findOne({
      email: emailFromInput,
      isActivated: true,
    }).lean()

    if (user) {
      res.status(httpStatus.forbidden_403).json({ message: 'already exists' })

      return
    }

    const saltRounds = 10
    const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)
    const activationKey = nanoid(5)

    const newUser = await UserModel.findOneAndUpdate(
      { email: emailFromInput },
      {
        password: passwordEncrypted,
        activationKey,
        registeredAt: new Date(),
      },
      { new: true, upsert: true },
    ).lean()

    if (newUser.activationKey !== activationKey) {
      res
        .status(httpStatus.serverError_500)
        .json({ message: 'activation key not issued' })

      return
    }

    const emailRes = await sendEmail({
      to: emailFromInput,
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
