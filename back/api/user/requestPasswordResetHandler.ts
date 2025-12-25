import { usersTable } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import type { User } from '@entities/user/type'
import type { NextFunction, Request, Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'

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

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailFromInput))

  if (userSelected === undefined) {
    res.status(httpStatusCode.forbidden403).json({ message: 'does not exists' })

    return
  }

  if (userSelected.isActivated === false) {
    res
      .status(httpStatusCode.forbidden403)
      .json({ message: 'account not activated' })

    return
  }

  const resetPasswordKey = generateId()

  const [userUpdated] = await db
    .update(usersTable)
    .set({ resetPasswordKey })
    .where(eq(usersTable.email, emailFromInput))
    .returning()

  if (userUpdated === undefined) {
    res
      .status(httpStatusCode.serverError500)
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
            href="${runtimeConfig.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}"
          >
            ${runtimeConfig.front.baseUrl}/reset-password/${emailFromInput}/${resetPasswordKey}
          </a>
        </p>
      `,
  })

  // https://developers.mailersend.com/general.html#api-response
  if (emailRes.statusCode === 202) {
    res.status(httpStatusCode.created201).json({ message: 'reset link sent' })

    return
  }

  res
    .status(httpStatusCode.serverError500)
    .json({ message: 'reset link not sent' })
}
