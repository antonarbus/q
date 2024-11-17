import { Router, type Request, type Response, type NextFunction } from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import { nanoid } from '../../lib/nanoid'
import { sendEmail } from '../../services/email'
import { config } from '@back/config'

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
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const requestPasswordResetRouter = Router()

const requestPasswordReset: RouterHandler = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email }).lean()

    if (!user) {
      res.status(httpStatus.forbidden_403).json({ message: 'does not exists' })

      return
    }

    if (!user.isActivated) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'account not activated' })

      return
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { resetPasswordKey: nanoid(5) },
      { new: true },
    )

    const resetPasswordKey = updatedUser?.resetPasswordKey

    if (!resetPasswordKey) {
      res
        .status(httpStatus.serverError_500)
        .json({ message: 'reset key not issued' })

      return
    }

    const emailRes = await sendEmail({
      to: email,
      subject: 'Password reset',
      html: `
        <p>Follow the link to reset the password.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${config.front.baseUrl}/reset-password/${email}/${resetPasswordKey}"
          >
            ${config.front.baseUrl}/reset-password/${email}/${resetPasswordKey}
          </a>
        </p>
      `,
    })

    if (emailRes?.[0].statusCode === 202) {
      res.status(httpStatus.created_201).json({ message: 'reset link sent' })

      return
    }

    res
      .status(httpStatus.serverError_500)
      .json({ message: 'reset link not sent' })
  } catch (error) {
    next(error)
  }
}

requestPasswordResetRouter.post('/', requestPasswordReset)
