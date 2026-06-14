import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
import { runtimeConfig } from '@root/config/runtime'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

type ReqBody = undefined

export type ResBody = {
  checkoutUrl: string
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'SUBSCRIPTION_CHECKOUT_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const subscriptionCheckoutHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })
  const messageList: string[] = []
  const stripe = await getStripe()

  const session = await stripe.instance.checkout.sessions
    .create({
      mode: 'payment',
      line_items: [
        {
          price: stripe.subscriptionPriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userEmail: user.email,
      },
      success_url: `${runtimeConfig.front.baseUrl}/?subscription=success`,
      cancel_url: `${runtimeConfig.front.baseUrl}/`,
    })
    .catch((error: unknown) => {
      const stripeMessage = error instanceof Error ? error.message : String(error)

      messageList.push(`Stripe error: ${stripeMessage}`)

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'SUBSCRIPTION_CHECKOUT_FAILED',
        statusCode: httpStatusCode.badRequest400,
        message: messageList.join(' | '),
      })
    })

  messageList.push(`Checkout session created: ${session.id}`)

  if (session.url === null) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'SUBSCRIPTION_CHECKOUT_FAILED',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      checkoutUrl: session.url,
      message: messageList.join(' | '),
    },
  })
}
