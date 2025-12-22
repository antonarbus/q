import { bookmarksTable } from '@back/entities/bookmark'
import { QuotationModel } from '@back/entities/quotation'
import {
  getUserFromAccessTokenOrThrowUnauthorized,
  UserModel,
} from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import { db } from '@back/shared/lib/drizzle/db'
// import { bucket, getFolderPath } from '@back/shared/services/storage'
import type { User } from '@entities/user/type'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  statistics: string[]
  message: 'deleted'
}

export type ErrorResBody = {
  statistics: string[]
  message: ErrorMessageCommon | 'not allowed' | 'user not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteUserHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const isOwner = userFromAccessToken.email === req.body.email
  const isSuperAdmin = userFromAccessToken.roles.includes(userRole.superAdmin)

  const notAllowed = isOwner === false && isSuperAdmin === false

  if (notAllowed === true) {
    res
      .status(httpStatus.forbidden403)
      .json({ message: 'not allowed', statistics: [] })

    return
  }

  const statistics = []

  // delete from db

  const deleteUserResult = await UserModel.deleteOne({
    email: req.body.email,
  })

  if (deleteUserResult.deletedCount === 0) {
    statistics.push(`${req.body.email} was not found in database ❌`)
  } else {
    statistics.push(`${req.body.email} was deleted from database ✅`)
  }

  const deleteQuotationsResult = await QuotationModel.deleteMany({
    email: req.body.email,
  })

  if (deleteQuotationsResult.deletedCount === 0) {
    statistics.push(`quotations were not found in database ❌`)
  } else {
    statistics.push(
      `${deleteQuotationsResult.deletedCount} quotations were deleted from database ✅`,
    )
  }

  const deleteResponse = await db
    .delete(bookmarksTable)
    .where(eq(bookmarksTable.email, userFromAccessToken.email))

  if (deleteResponse.rowCount === 0) {
    statistics.push(`bookmarks were not found in database ❌`)
  } else {
    statistics.push(
      `${deleteResponse.rowCount} bookmarks were deleted from database ✅`,
    )
  }

  // delete quotations from bucket

  /*
  const [quotationFiles] = await bucket.getFiles({
    prefix: getFolderPath({ fileType: 'quotation' }),
  })

  if (quotationFiles.length === 0) {
    statistics.push('0 quotations were deleted from bucket')
  }

  const quotationsDeleteRes = await Promise.allSettled(
    quotationFiles.map(async (file) => file.delete()),
  )

  const quotationsDeletedQty = quotationsDeleteRes.filter(
    (quotationDeletionRes) => quotationDeletionRes.status === 'fulfilled',
  ).length

  if (quotationsDeletedQty > 0) {
    statistics.push(
      `${quotationsDeletedQty} quotations were deleted from bucket ✅`,
    )
  }

  const quotationsNotDeletedQty = quotationsDeleteRes.filter(
    (quotationDeletionRes) => quotationDeletionRes.status === 'rejected',
  ).length

  if (quotationsNotDeletedQty > 0) {
    statistics.push(
      `${quotationsNotDeletedQty} quotations were not deleted from bucket ❌`,
    )
  }

  // delete bookmarks from bucket

  const [bookmarkFiles] = await bucket.getFiles({
    prefix: getFolderPath({ fileType: 'bookmark' }),
  })

  if (bookmarkFiles.length === 0) {
    statistics.push('0 bookmarks were deleted from bucket')
  }

  const bookmarksDeleteRes = await Promise.allSettled(
    bookmarkFiles.map(async (file) => file.delete()),
  )

  const bookmarksDeletedQty = bookmarksDeleteRes.filter(
    (bookmarkDeletionRes) => bookmarkDeletionRes.status === 'fulfilled',
  ).length

  if (bookmarksDeletedQty > 0) {
    statistics.push(
      `${bookmarksDeletedQty} bookmarks were deleted from bucket ✅`,
    )
  }

  const bookmarksNotDeletedQty = bookmarksDeleteRes.filter(
    (bookmarkDeletionRes) => bookmarkDeletionRes.status === 'rejected',
  ).length

  if (bookmarksNotDeletedQty > 0) {
    statistics.push(
      `${bookmarksNotDeletedQty} bookmarks were not deleted from bucket ❌`,
    )
  }

  // delete files from bucket

  const [files] = await bucket.getFiles({
    prefix: getFolderPath({ fileType: 'file' }),
  })

  if (files.length === 0) {
    statistics.push('0 files were deleted')
  }

  const filesDeleteRes = await Promise.allSettled(
    files.map(async (file) => file.delete()),
  )

  const filesDeletedQty = filesDeleteRes.filter(
    (bookmarkDeletionRes) => bookmarkDeletionRes.status === 'fulfilled',
  ).length

  if (filesDeletedQty > 0) {
    statistics.push(`${filesDeletedQty} bookmarks were deleted from bucket ✅`)
  }

  const filesNotDeletedQty = filesDeleteRes.filter(
    (bookmarkDeletionRes) => bookmarkDeletionRes.status === 'rejected',
  ).length

  if (filesNotDeletedQty > 0) {
    statistics.push(
      `${filesNotDeletedQty} bookmarks were not deleted from bucket ❌`,
    )
  }
  
  */

  res.status(httpStatus.success200).json({ message: 'deleted', statistics })
}
