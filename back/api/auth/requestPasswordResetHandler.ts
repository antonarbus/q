import { config } from '@back/config'
import { UserModel } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import type { User } from '@entities/user'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message: 'reset link sent'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'does not exists'
    | 'account not activated'
    | 'reset key not issued'
    | 'reset link not sent'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const requestPasswordResetHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const emailFromInput = req.body.email.toLowerCase()

  const user = await UserModel.findOne({ email: emailFromInput }).lean()

  if (user === null) {
    res.status(httpStatus.forbidden_403).json({ message: 'does not exists' })

    return
  }

  if (user.isActivated === false) {
    res
      .status(httpStatus.forbidden_403)
      .json({ message: 'account not activated' })

    return
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { email: emailFromInput },
    { resetPasswordKey: generateId() },
    { new: true },
  )

  const resetPasswordKey = updatedUser?.resetPasswordKey

  if (resetPasswordKey === undefined) {
    res
      .status(httpStatus.serverError_500)
      .json({ message: 'reset key not issued' })

    return
  }

  const emailRes = await sendEmail({
    to: emailFromInput,
    subject: 'Password reset',
    html: `
        <p>Follow the link to reset the password.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${config.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}"
          >
            ${config.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}
          </a>
        </p>
      `,
  })

  // https://developers.mailersend.com/general.html#api-response
  if (emailRes.statusCode === 202) {
    res.status(httpStatus.created_201).json({ message: 'reset link sent' })

    return
  }

  res
    .status(httpStatus.serverError_500)
    .json({ message: 'reset link not sent' })
}
