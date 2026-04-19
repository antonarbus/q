import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
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
  description: string
}

export type ResBody = {
  paymentLinkId: string
  paymentLinkUrl: string
  message: string
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const createPaymentLinkHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const { quotationId, amount, currency, description } = req.body

  const [userSelected] = await db
    .select({ stripeAccountId: usersTable.stripeAccountId })
    .from(usersTable)
    .where(eq(usersTable.email, user.email))

  const stripeAccountId = userSelected?.stripeAccountId ?? null

  if (stripeAccountId === null) {
    messageList.push('No Stripe account connected')

    throw new HttpError({
      errorCode: 'BAD_REQUEST',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Stripe account found: ${stripeAccountId}`)

  const stripe = await getStripe()

  const successUrl = `${runtimeConfig.front.baseUrl}/${quotationId}?payment=success`

  const paymentLink = await stripe.instance.paymentLinks.create(
    {
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: amount,
            product_data: {
              name: description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { quotationId },
      after_completion: {
        type: 'redirect',
        redirect: { url: successUrl },
      },
    },
    { stripeAccount: stripeAccountId },
  )

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
