import { type InsertFile, filesTable } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = Required<Pick<InsertFile, 'id' | 'name' | 'size'>>

export type ResBody = {
  fileInfo: InsertFile
  message: string
}

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FILE_SAVE_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const saveFileInfoHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

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
    messageList.push('Failed to save file information to database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_SAVE_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('File information saved to database')

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      fileInfo: fileInserted,
      message: messageList.join(' | '),
    },
  })
}
