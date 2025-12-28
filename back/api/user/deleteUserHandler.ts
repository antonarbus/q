import { bookmarksTable } from '@back/entities/bookmark'
import { quotationsTable } from '@back/entities/quotation'
import {
  type SelectUser,
  getUserFromAccessTokenOrThrowUnauthorized,
  usersTable,
} from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { userRole } from '@back/shared/const/userRole'
import { db } from '@back/shared/lib/drizzle/db'
// import { bucket, getFolderPath } from '@back/shared/services/storage'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: SelectUser['email']
}

export type ResBody = {
  statistics: string[]
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_ALLOWED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteUserHandler: RouterHandler = async (req, res) => {
  const messageList: string[] = []

  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const isOwner = userFromAccessToken.email === req.body.email
  const isSuperAdmin = userFromAccessToken.roles.includes(userRole.superAdmin)

  const notAllowed = isOwner === false && isSuperAdmin === false

  if (notAllowed === true) {
    messageList.push('Not allowed to delete this user')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_ALLOWED',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  if (isOwner === true) {
    messageList.push('Owner deleting own account')
  } else if (isSuperAdmin === true) {
    messageList.push('Super admin deleting user account')
  }

  const statistics = []

  // delete from db

  const deleteUserResponse = await db
    .delete(usersTable)
    .where(eq(usersTable.email, req.body.email))

  if (deleteUserResponse.rowCount === 0) {
    statistics.push(`${req.body.email} was not found in database ❌`)
  } else {
    statistics.push(`${req.body.email} was deleted from database ✅`)
  }

  const deleteQuotationsResult = await db
    .delete(quotationsTable)
    .where(eq(quotationsTable.email, req.body.email))

  if (deleteQuotationsResult.rowCount === 0) {
    statistics.push(`quotations were not found in database ❌`)
  } else {
    statistics.push(
      `${deleteQuotationsResult.rowCount} quotations were deleted from database ✅`,
    )
  }

  const deleteBookmarkResponse = await db
    .delete(bookmarksTable)
    .where(eq(bookmarksTable.email, userFromAccessToken.email))

  if (deleteBookmarkResponse.rowCount === 0) {
    statistics.push(`bookmarks were not found in database ❌`)
  } else {
    statistics.push(
      `${deleteBookmarkResponse.rowCount} bookmarks were deleted from database ✅`,
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

  messageList.push('User deletion completed')

  res.status(httpStatusCode.success200).json({
    statistics,
    message: messageList.join(' | '),
  })
}
