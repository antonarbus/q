import { type InsertFile, filesTable } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = Required<Pick<InsertFile, 'id' | 'name' | 'size'>>

export type ResBody = InsertFile

type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'FILE_SAVE_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_SAVE_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to save file information',
    })
  }

  res.status(httpStatusCode.success200).json(fileInserted)
}
