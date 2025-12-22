import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmark: SelectBookmark
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
    res.status(httpStatus.forbidden403).json({ message: 'id is not provided' })

    return
  }

  const [bookmark] = await db
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
        updatedAt: new Date(),
      },
    })
    .returning()

  if (bookmark === undefined) {
    res.status(httpStatus.serverError500).json({ message: 'failed to save' })

    return
  }

  const { path } = getFileInfo({ id: req.body.bookmark.id })
  const bookmarkFile = bucket.file(path)

  const contents = JSON.stringify(
    { ...bookmark, ...req.body.bookmark },
    null,
    2,
  )

  await bookmarkFile.save(contents)

  const isNew = bookmark.createdAt.getTime() === bookmark.updatedAt.getTime()

  res.status(httpStatus.success200).json({
    message: isNew === true ? 'saved' : 'updated',
    bookmark: { ...bookmark, ...req.body.bookmark },
  })
}
