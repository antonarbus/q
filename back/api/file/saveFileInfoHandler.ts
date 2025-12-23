import { type SelectFile, filesTable } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  id: SelectFile['id']
  name: SelectFile['name']
  size: SelectFile['size']
}

export type ResBody = SelectFile

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

  const [insertedFile] = await db
    .insert(filesTable)
    .values({
      id: req.body.id,
      email: userFromAccessToken.email,
      name: req.body.name,
      size: req.body.size,
    })
    .onConflictDoNothing()
    .returning()

  if (insertedFile === undefined) {
    res.status(httpStatus.serverError500).json({
      message: 'failed to make file public',
    })

    return
  }

  res.status(httpStatus.success200).json(insertedFile)
}
