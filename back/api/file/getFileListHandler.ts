import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  fileList: {
    id: SelectFile['id']
    name: SelectFile['name']
    size: SelectFile['size']
  }[]
  message: 'file stats'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const selectedFileList = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.email, userFromAccessToken.email))

  res
    .status(httpStatus.success200)
    .json({ message: 'file stats', fileList: selectedFileList })
}
