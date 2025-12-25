import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
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
  message: 'deleted'
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCodeCommon
    | 'FILE_DELETE_FAILED'
    | 'FILE_NOT_OWNED'
    | 'FILE_NOT_FOUND'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteFileHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: 'File not found',
    })
  }

  if (fileOwnerShip === 'not owner') {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_NOT_OWNED',
      statusCode: httpStatusCode.notFound404,
      message: 'You did not upload this file',
    })
  }

  if (fileOwnerShip === 'owner') {
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
    } catch {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FILE_DELETE_FAILED',
        statusCode: httpStatusCode.notFound404,
        message: 'Failed to delete file',
      })
    }

    res.status(httpStatusCode.success200).json({ message: 'deleted' })
  }
}
