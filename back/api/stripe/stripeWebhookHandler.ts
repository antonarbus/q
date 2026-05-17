// oxlint-disable complexity
import { quotationsTable } from '@back/entity/quotation/db/quotationsTableSchema'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
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

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'STRIPE_WEBHOOK_MISSING_SIGNATURE' | 'STRIPE_WEBHOOK_VERIFICATION_FAILED'
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

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_WEBHOOK_MISSING_SIGNATURE',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Signature header present')

  const stripe = await getStripe()

  // Two destinations post to the same URL with different signing secrets.
  // Try account secret first (subscription payments), fall back to connected (quotation payments).
  const event =
    (await stripe.instance.webhooks
      .constructEventAsync(req.body, stripeSignature, stripe.webhookSecret.account)
      .catch(() => null)) ??
    (await stripe.instance.webhooks
      .constructEventAsync(req.body, stripeSignature, stripe.webhookSecret.connected)
      .catch(() => null))

  if (event === null) {
    // oxlint-disable-next-line no-console
    console.error('Stripe webhook signature verification failed for both secrets')
    messageList.push('Stripe webhook signature verification failed')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'STRIPE_WEBHOOK_VERIFICATION_FAILED',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Stripe webhook event verified: ${event.type}`)

  // Single Stripe endpoint receives all event types.
  // checkout.session.completed fires for two independent payment flows —
  // each identified by its own metadata keys, only one will match per event.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.payment_status === 'paid') {
      // Flow 1: visitor paid for a quoted service (Stripe Connect)
      const quotationId = session.metadata?.quotationId

      if (typeof quotationId === 'string' && quotationId.length > 0) {
        await db
          .update(quotationsTable)
          .set({ paidAt: new Date().toISOString() })
          .where(eq(quotationsTable.id, quotationId))

        messageList.push(`Quotation ${quotationId} marked as paid`)
      }

      // Flow 2: user bought a platform subscription
      const userEmailFromSession = session.metadata?.userEmail

      if (typeof userEmailFromSession === 'string' && userEmailFromSession.length > 0) {
        const [userSelected] = await db
          .select({ subscriptionExpiresAt: usersTable.subscriptionExpiresAt })
          .from(usersTable)
          .where(eq(usersTable.email, userEmailFromSession))

        // Stack on top of existing expiry if still active, otherwise start from today
        const currentExpiry = userSelected?.subscriptionExpiresAt ?? null

        const base =
          currentExpiry !== null && new Date(currentExpiry) > new Date()
            ? new Date(currentExpiry)
            : new Date()

        const newExpiry = new Date(base)
        newExpiry.setDate(newExpiry.getDate() + 365)

        await db
          .update(usersTable)
          .set({ subscriptionExpiresAt: newExpiry.toISOString() })
          .where(eq(usersTable.email, userEmailFromSession))

        messageList.push(
          `Subscription granted to ${userEmailFromSession} until ${newExpiry.toISOString()}`,
        )
      }
    }
  }

  // Flow 3: quotation owner disconnected their Stripe account from the platform
  if (event.type === 'account.application.deauthorized') {
    const stripeAccountId = event.account

    if (typeof stripeAccountId === 'string' && stripeAccountId.length > 0) {
      await db
        .update(usersTable)
        .set({ stripeAccountId: null })
        .where(eq(usersTable.stripeAccountId, stripeAccountId))

      messageList.push(`Stripe account ${stripeAccountId} disconnected`)
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
