import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { runtimeConfig } from '@root/config/runtime'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'connected to db'
  runtimeConfig: typeof runtimeConfig
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'connection to db failed'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
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

    res
      .status(httpStatusCode.serverError500)
      .json({ message: 'connection to db failed' })
  }
}
