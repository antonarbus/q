import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
import type { Stripe } from 'stripe'
import { runtimeConfig } from '@root/config/runtime'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  quotationId: string
  amount: number
  currency: string
}

export type ResBody = {
  paymentLinkId: string
  paymentLinkUrl: string
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'STRIPE_ACCOUNT_NOT_CONNECTED' | 'STRIPE_PAYMENT_LINK_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const createPaymentLinkHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const [userSelected] = await db
    .select({ stripeAccountId: usersTable.stripeAccountId })
    .from(usersTable)
    .where(eq(usersTable.email, user.email))

  const stripeAccountId = userSelected?.stripeAccountId ?? null

  if (stripeAccountId === null) {
    messageList.push('No Stripe account connected')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_ACCOUNT_NOT_CONNECTED',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Stripe account found: ${stripeAccountId}`)

  const stripe = await getStripe()

  const successUrl = `${runtimeConfig.front.baseUrl}/${req.body.quotationId}?payment=success`

  const paymentLink = await (async (): Promise<Stripe.PaymentLink> => {
    try {
      return await stripe.instance.paymentLinks.create(
        {
          line_items: [
            {
              price_data: {
                currency: req.body.currency.toLowerCase(),
                unit_amount: req.body.amount,
                product_data: {
                  name: req.body.quotationId,
                },
              },
              quantity: 1,
            },
          ],
          metadata: { quotationId: req.body.quotationId },
          after_completion: {
            type: 'redirect',
            redirect: { url: successUrl },
          },
        },
        { stripeAccount: stripeAccountId },
      )
    } catch (error) {
      const stripeMessage = error instanceof Error ? error.message : String(error)

      messageList.push(`Stripe error: ${stripeMessage}`)

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'STRIPE_PAYMENT_LINK_FAILED',
        statusCode: httpStatusCode.badRequest400,
        message: messageList.join(' | '),
      })
    }
  })()

  messageList.push(`Payment link created: ${paymentLink.id}`)

  return httpJsonResponse({
    statusCode: httpStatusCode.created201,
    body: {
      paymentLinkId: paymentLink.id,
      paymentLinkUrl: paymentLink.url,
      message: messageList.join(' | '),
    },
  })
}
