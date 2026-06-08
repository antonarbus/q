import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpRedirect } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
import { runtimeConfig } from '@root/config/runtime'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs &
  (
    | {
        // Stripe sets code
        code?: string
        // stripeConnectUrlHandler() adds parameter
        state: string
      }
    | {
        error: string
      }
  )

type UrlParam = ParamsDictionary
type ReqBody = undefined

type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'STRIPE_CONNECT_MISSING_PARAMS'
    | 'STRIPE_CONNECT_INVALID_STATE'
    | 'STRIPE_CONNECT_NO_ACCOUNT_ID'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response,
  next: NextFunction,
) => Promise<HttpResponse>

export const stripeConnectCallbackHandler: RouterHandler = async (req) => {
  // const { code, state, error } = req.query

  const messageList: string[] = []

  const frontendSettingsUrl = `${runtimeConfig.front.baseUrl}/settings`

  if (typeof req.query.error === 'string') {
    messageList.push(`Stripe OAuth error: ${req.query.error}`)

    return httpRedirect({
      statusCode: httpStatusCode.reDirect302,
      redirectUrl: `${frontendSettingsUrl}?stripe_error=${encodeURIComponent(req.query.error)}`,
    })
  }

  if (typeof req.query.code !== 'string' || typeof req.query.state !== 'string') {
    messageList.push('Missing code or state parameter')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_CONNECT_MISSING_PARAMS',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Code and state received')

  const [jwtSecret, stripe] = await Promise.all([getSecret('JWT_ACCESS_SECRET'), getStripe()])

  // oxlint-disable-next-line init-declarations
  let email: string

  try {
    const payload = jwt.verify(req.query.state, jwtSecret) as { email?: string }

    if (typeof payload.email !== 'string') {
      throw new TypeError('Invalid state payload')
    }

    ;({ email } = payload)
  } catch {
    messageList.push('Invalid or expired state parameter')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_CONNECT_INVALID_STATE',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`State verified for email: ${email}`)

  const tokenResponse = await stripe.instance.oauth.token({
    grant_type: 'authorization_code',
    code: req.query.code,
  })

  const stripeAccountId = tokenResponse.stripe_user_id

  if (typeof stripeAccountId !== 'string' || stripeAccountId.length === 0) {
    messageList.push('Stripe account ID not returned from OAuth')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_CONNECT_NO_ACCOUNT_ID',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Stripe account ID received: ${stripeAccountId}`)

  await db.update(usersTable).set({ stripeAccountId }).where(eq(usersTable.email, email))

  messageList.push('Stripe account ID saved to user record')

  return httpRedirect({
    statusCode: httpStatusCode.reDirect302,
    redirectUrl: `${frontendSettingsUrl}?stripe_connected=true`,
  })
}
