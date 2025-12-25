import { type InsertFile, filesTable } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = Required<Pick<InsertFile, 'id' | 'name' | 'size'>>

export type ResBody = InsertFile

type ErrorResBody = {
  message: ErrorMessageCommon | 'invalid file id' | 'failed to make file public'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const saveFileInfoHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const [fileInserted] = await db
    .insert(filesTable)
    .values({
      id: req.body.id,
      email: userFromAccessToken.email,
      name: req.body.name,
      size: req.body.size,
    })
    .onConflictDoNothing()
    .returning()

  if (fileInserted === undefined) {
    res.status(httpStatusCode.serverError500).json({
      message: 'failed to make file public',
    })

    return
  }

  res.status(httpStatusCode.success200).json(fileInserted)
}
