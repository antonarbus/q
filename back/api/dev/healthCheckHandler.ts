import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { runtimeConfig } from '@root/config/runtime'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ResBody = {
  message: 'connected to db'
  runtimeConfig: typeof runtimeConfig
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'DB_CONNECTION_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const healthCheckHandler: RouterHandler = async (_req, res, _next) => {
  try {
    // Simple query to verify Postgres / Drizzle connectivity
    await db.execute(sql`select 1`)

    res.status(httpStatusCode.success200).json({
      message: 'connected to db',
      runtimeConfig,
    })
  } catch (error) {
    console.error('health check database error', error)

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'DB_CONNECTION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: 'Database connection failed',
    })
  }
}
