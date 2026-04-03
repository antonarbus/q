import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { runtimeConfig } from '@root/config/runtime'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { getUserFromRefreshTokenOrNull } from '@back/entity/user/getUserFromRefreshTokenOrNull'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { log } from '@back/shared/util/log'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  message: string
  runtimeConfig?: typeof runtimeConfig
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'DB_CONNECTION_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const healthCheckHandler: RouterHandler = async (req) => {
  const userFromAccessToken = await getUserFromRefreshTokenOrNull({ req })

  const messageList: string[] = []

  const isSuperAdmin = userFromAccessToken?.roles.includes('super-admin')

  // Simple query to verify Postgres / Drizzle connectivity
  await db.execute(sql`select 1`).catch((error: unknown) => {
    log.error('health check database error', error)

    messageList.push('Database connection failed')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'DB_CONNECTION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  })

  messageList.push('Database connection successful')

  if (isSuperAdmin === true) {
    messageList.push('Super-admin runtime config included')
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
      runtimeConfig: isSuperAdmin === true ? runtimeConfig : undefined,
    },
  })
}
