import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
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
type ReqBody = undefined

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'STRIPE_DISCONNECT_NO_ACCOUNT' | 'STRIPE_DISCONNECT_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const stripeDisconnectHandler: RouterHandler = async (req) => {
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
      errorCode: 'STRIPE_DISCONNECT_NO_ACCOUNT',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Stripe account found: ${stripeAccountId}`)

  const stripe = await getStripe()

  await stripe.instance.oauth
    .deauthorize({
      client_id: stripe.clientId,
      stripe_user_id: stripeAccountId,
    })
    .catch(() => {
      messageList.push('Stripe OAuth deauthorize failed, clearing locally anyway')
    })

  messageList.push('Stripe OAuth deauthorize succeeded')

  await db.update(usersTable).set({ stripeAccountId: null }).where(eq(usersTable.email, user.email))

  messageList.push('Stripe account disconnected')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: { message: messageList.join(' | ') },
  })
}
