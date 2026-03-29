import { filesTable, type SelectFile } from '@back/entity/file/db/filesTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { type HttpResponse, httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  fileList: {
    id: SelectFile['id']
    name: SelectFile['name']
    size: SelectFile['size']
  }[]
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getFileListHandler: RouterHandler = async (req) => {
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  const fileListSelected = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.email, userFromAccessToken.email))

  messageList.push(`Found ${fileListSelected.length} files`)

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      fileList: fileListSelected,
      message: messageList.join(' | '),
    },
  })
}
