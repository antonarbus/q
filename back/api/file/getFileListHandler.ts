import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = unknown

export type ResBody = {
  fileList: {
    id: SelectFile['id']
    name: SelectFile['name']
    size: SelectFile['size']
  }[]
  message: 'file stats'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const fileListSelected = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.email, userFromAccessToken.email))

  res
    .status(httpStatusCode.success200)
    .json({ message: 'file stats', fileList: fileListSelected })
}
