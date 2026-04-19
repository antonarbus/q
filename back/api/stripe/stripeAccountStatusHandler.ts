import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  connected: boolean
  stripeAccountId: string | null
  message: string
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const stripeAccountStatusHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const [userSelected] = await db
    .select({ stripeAccountId: usersTable.stripeAccountId })
    .from(usersTable)
    .where(eq(usersTable.email, user.email))

  const userStripeAccountId = userSelected?.stripeAccountId ?? null
  const isStripeAccountConnected = userStripeAccountId !== null

  messageList.push(
    isStripeAccountConnected ? 'Stripe account connected' : 'No Stripe account connected',
  )

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      connected: isStripeAccountConnected,
      stripeAccountId: userStripeAccountId,
      message: messageList.join(' | '),
    },
  })
}
