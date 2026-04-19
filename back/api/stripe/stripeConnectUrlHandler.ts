import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
import { runtimeConfig } from '@root/config/runtime'
import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  url: string
  message: string
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const stripeConnectUrlHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const [stripe, jwtSecret] = await Promise.all([getStripe(), getSecret('JWT_ACCESS_SECRET')])

  messageList.push('Secrets loaded')

  const state = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '10m' })

  messageList.push('State JWT signed')

  const redirectUri = `${runtimeConfig.back.baseUrl}/api/stripe/connect-callback`

  const url = new URL('https://connect.stripe.com/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', stripe.clientId)
  url.searchParams.set('scope', 'read_write')
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('state', state)

  messageList.push('Stripe Connect OAuth URL generated')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      url: url.toString(),
      message: messageList.join(' | '),
    },
  })
}
