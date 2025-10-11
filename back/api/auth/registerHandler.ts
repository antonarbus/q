import { config } from '@back/config'
import { UserModel } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { sendEmail } from '@back/shared/lib/mailersend'
import { generateId } from '@back/shared/lib/nanoid'
import type { User } from '@entities/user/type'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  email: User['email']
  roles: User['roles']
  message: 'activation link sent'
}

export type ErrorResBody = {
  accessJwtToken: string
  email: User['email']
  roles: User['roles']
  message:
    | ErrorMessageCommon
    | 'already exists'
    | 'activation link not sent'
    | 'activation key not issued'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const registerHandler: RouterHandler = async (req, res, _next) => {
  const emailFromInput = req.body.email.toLowerCase()
  const passwordFromInput = req.body.password

  const user = await UserModel.findOne({
    email: emailFromInput,
    isActivated: true,
  }).lean()

  if (user !== null) {
    res.status(httpStatus.forbidden_403).json({
      message: 'already exists',
      accessJwtToken: 'no access token',
      email: emailFromInput,
      roles: [userRole.user],
    })

    return
  }

  const saltRounds = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)
  const activationKey = generateId()

  const { refreshJwtToken } = generateRefreshToken({
    email: emailFromInput,
    roles: [userRole.user],
  })

  setRefreshTokenCookie({ res, refreshJwtToken })

  const newUser = await UserModel.findOneAndUpdate(
    { email: emailFromInput },
    {
      password: passwordEncrypted,
      activationKey,
      refreshJwtToken,
      isActivated: false,
      registeredAt: new Date(),
      loggedAt: new Date(),
    },
    { new: true, upsert: true },
  ).lean()

  // ? not clear why this is needed, it should always be true
  if (newUser.activationKey !== activationKey) {
    res.status(httpStatus.serverError_500).json({
      message: 'activation key not issued',
      accessJwtToken: 'no access token',
      email: emailFromInput,
      roles: [userRole.user],
    })

    return
  }

  const emailRes = await sendEmail({
    to: emailFromInput,
    subject: 'Confirm your email',
    html: `
        <p>Follow the link to confirm your email.</p>
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

  const { accessJwtToken, accessJwtTokenExpiresOn } = generateAccessToken({
    email: emailFromInput,
    roles: [userRole.user],
  })

  // https://developers.mailersend.com/general.html#api-response
  if (emailRes.statusCode === 202) {
    res.status(httpStatus.created_201).json({
      message: 'activation link sent',
      email: emailFromInput,
      roles: [userRole.user],
      accessJwtToken,
      accessJwtTokenExpiresOn,
    })

    return
  }

  res.status(httpStatus.serverError_500).json({
    message: 'activation link not sent',
    accessJwtToken: 'no access token',
    email: emailFromInput,
    roles: [userRole.user],
  })
}
