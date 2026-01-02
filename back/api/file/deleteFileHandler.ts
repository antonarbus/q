import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  fileId: SelectFile['id']
}

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'FILE_DELETE_FAILED'
    | 'FILE_NOT_OWNED'
    | 'FILE_NOT_FOUND'
    | 'UNHANDLED_CASE'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const deleteFileHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  type FileOwnerShip = 'file not found' | 'owner' | 'not owner'

  const getFileOwnerShip = async (): Promise<FileOwnerShip> => {
    const [fileSelected] = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, req.body.fileId))

    if (fileSelected === undefined) {
      return 'file not found'
    }

    if (fileSelected.email !== userFromAccessToken.email) {
      return 'not owner'
    }

    return 'owner'
  }

  const fileOwnerShip = await getFileOwnerShip()

  if (fileOwnerShip === 'file not found') {
    messageList.push('File not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  if (fileOwnerShip === 'not owner') {
    messageList.push('File not owned by user')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_NOT_OWNED',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  if (fileOwnerShip === 'owner') {
    messageList.push('File ownership verified')

    const fileInfo = getFileInfo({ id: req.body.fileId })

    try {
      const deleteFromBucketPromise = bucket.file(fileInfo.path).delete()

      const deleteFromDatabasePromise = db
        .delete(filesTable)
        .where(
          and(
            eq(filesTable.email, userFromAccessToken.email),
            eq(filesTable.id, req.body.fileId),
          ),
        )

      await Promise.all([deleteFromBucketPromise, deleteFromDatabasePromise])

      messageList.push('File deleted from storage and database')
    } catch {
      messageList.push('Failed to delete file')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FILE_DELETE_FAILED',
        statusCode: httpStatusCode.notFound404,
        message: messageList.join(' | '),
      })
    }

    return httpResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
      },
    })
  }

  messageList.push('Unhandled case at the end')

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'UNHANDLED_CASE',
    statusCode: httpStatusCode.serverError500,
    message: messageList.join(' | '),
  })
}
