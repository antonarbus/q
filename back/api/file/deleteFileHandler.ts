import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  fileId: SelectFile['id']
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'failed to delete'
    | 'you did not upload this file'
    | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteFileHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  type FileOwnerShip = 'file not found' | 'owner' | 'not owner'

  const getFileOwnerShip = async (): Promise<FileOwnerShip> => {
    const [selectedFile] = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, req.body.fileId))

    if (selectedFile === undefined) {
      return 'file not found'
    }

    if (selectedFile.email !== userFromAccessToken.email) {
      return 'not owner'
    }

    return 'owner'
  }

  const fileOwnerShip = await getFileOwnerShip()

  if (fileOwnerShip === 'file not found') {
    res.status(httpStatus.notFound404).json({ message: 'not found' })

    return
  }

  if (fileOwnerShip === 'not owner') {
    res
      .status(httpStatus.notFound404)
      .json({ message: 'you did not upload this file' })

    return
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
      res.status(httpStatus.notFound404).json({ message: 'failed to delete' })

      return
    }

    res.status(httpStatus.success200).json({ message: 'deleted' })
  }
}
