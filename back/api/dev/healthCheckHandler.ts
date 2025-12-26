import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { runtimeConfig } from '@root/config/runtime'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { getUserFromRefreshTokenOrNull } from '@back/entities/user'
import { userRole } from '@back/shared/const/userRole'

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
) => Promise<void>

export const healthCheckHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromRefreshTokenOrNull({ req })

  const isSuperAdmin = userFromAccessToken?.roles.includes(userRole.superAdmin)

  // Simple query to verify Postgres / Drizzle connectivity
  await db.execute(sql`select 1`).catch((error: unknown) => {
    console.error('health check database error', error)

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'DB_CONNECTION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: 'Database connection failed',
    })
  })

  res.status(httpStatusCode.success200).json({
    message: 'connected to db',
    runtimeConfig: isSuperAdmin === true ? runtimeConfig : undefined,
  })
}
