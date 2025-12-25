import {
  bookmarksTable,
  type InsertBookmark,
  type SelectBookmark,
} from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmark: Required<
    Pick<InsertBookmark, 'id' | 'type' | 'name' | 'category' | 'desc'>
  >
}

export type ResBody = {
  bookmark: SelectBookmark
  message: 'saved' | 'updated'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'name is not provided'
    | 'category is not provided'
    | 'id is not provided'
    | 'failed to save'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const saveBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (req.body.bookmark.id === '') {
    res
      .status(httpStatusCode.forbidden403)
      .json({ message: 'id is not provided' })

    return
  }

  const [bookmarkInserted] = await db
    .insert(bookmarksTable)
    .values({
      id: req.body.bookmark.id,
      email: userFromAccessToken.email,
      type: req.body.bookmark.type,
      name: req.body.bookmark.name,
      category: req.body.bookmark.category,
      desc: req.body.bookmark.desc,
    })
    .onConflictDoUpdate({
      target: bookmarksTable.id,
      set: {
        type: req.body.bookmark.type,
        name: req.body.bookmark.name,
        category: req.body.bookmark.category,
        desc: req.body.bookmark.desc,
        updatedAt: new Date().toISOString(),
      },
    })
    .returning()

  if (bookmarkInserted === undefined) {
    res
      .status(httpStatusCode.serverError500)
      .json({ message: 'failed to save' })

    return
  }

  const fileInfo = getFileInfo({ id: req.body.bookmark.id })
  const bookmarkFile = bucket.file(fileInfo.path)

  const contents = JSON.stringify(
    { ...bookmarkInserted, ...req.body.bookmark },
    null,
    2,
  )

  await bookmarkFile.save(contents)

  const isNew = bookmarkInserted.createdAt === bookmarkInserted.updatedAt

  res.status(httpStatusCode.success200).json({
    message: isNew === true ? 'saved' : 'updated',
    bookmark: bookmarkInserted,
  })
}
