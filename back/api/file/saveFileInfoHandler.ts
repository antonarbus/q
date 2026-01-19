import {
  type InsertFile,
  filesTable,
} from '@back/entity/file/db/filesTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import type { NextFunction, Request, Response } from 'express'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs

type UrlParam = {
  id: InsertFile['id']
}

export type ReqBody = Required<Pick<InsertFile, 'name' | 'size'>>

export type ResBody = {
  file: InsertFile
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
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  const [fileInserted] = await db
    .insert(filesTable)
    .values({
      id: req.params.id,
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

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      file: fileInserted,
      message: messageList.join(' | '),
    },
  })
}
