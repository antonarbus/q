import { quotationsTable } from '@back/entity/quotation/db/quotationsTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'
import { getStripe } from '@back/shared/lib/stripe/getStripe'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

type ResBody = {
  received: boolean
  message: string
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, Buffer, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const stripeWebhookHandler: RouterHandler = async (req) => {
  const messageList: string[] = []

  const stripeSignature = req.headers['stripe-signature']

  if (typeof stripeSignature !== 'string') {
    messageList.push('Missing stripe-signature header')

    throw new HttpError({
      errorCode: 'BAD_REQUEST',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Signature header present')

  const [stripe, webhookSecret] = await Promise.all([
    getStripe(),
    getSecret('STRIPE_WEBHOOK_SECRET'),
  ])

  // oxlint-disable-next-line init-declarations
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, stripeSignature, webhookSecret)
  } catch {
    messageList.push('Webhook signature verification failed')

    throw new HttpError({
      errorCode: 'BAD_REQUEST',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Webhook event verified: ${event.type}`)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.payment_status === 'paid') {
      const quotationId = session.metadata?.quotationId

      if (typeof quotationId === 'string' && quotationId.length > 0) {
        await db
          .update(quotationsTable)
          .set({ paidAt: new Date().toISOString() })
          .where(eq(quotationsTable.id, quotationId))

        messageList.push(`Quotation marked as paid: ${quotationId}`)
      }
    }
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      received: true,
      message: messageList.join(' | '),
    },
  })
}
