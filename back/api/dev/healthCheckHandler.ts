import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'connected to db'
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

    res.status(httpStatus.success200).json({ message: 'connected to db' })
  } catch (error) {
    console.error('health check database error', error)

    res
      .status(httpStatus.serverError500)
      .json({ message: 'connection to db failed' })
  }
}
