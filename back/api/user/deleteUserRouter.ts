import { Router } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromAccessTokenOrThrowUnauthorized } from '../../utils/jwt'
import type { User } from '@entities/user'
import { UserModel } from '@back/db/models/userModel'
import { QuotationModel } from '@back/db/models/quotationModel'
import { BookmarkModel } from '@back/db/models/bookmarkModel'

export type ReqBody = {
  email: User['email']
}

export type ResBody = {
  message: ErrorMessageCommon | 'not allowed' | 'user not found' | 'deleted'
  statistics: string[]
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const deleteUserRouter = Router()

const deleteUser: RouterHandler = async (req, res, next) => {
  try {
    const { email: emailFromToken, roles } =
      getUserFromAccessTokenOrThrowUnauthorized(req)

    const isOwner = emailFromToken === req.body.email
    const isSuperAdmin = roles.includes('super-admin')

    if (!isOwner && !isSuperAdmin) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not allowed', statistics: [] })
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

    const deleteBookmarksResult = await BookmarkModel.deleteMany({
      email: req.body.email,
    })

    if (deleteBookmarksResult.deletedCount === 0) {
      statistics.push(`bookmarks were not found in database ❌`)
    } else {
      statistics.push(
        `${deleteBookmarksResult.deletedCount} bookmarks were deleted from database ✅`,
      )
    }

    // delete quotations from bucket

    const [quotationFiles] = await bucket.getFiles({
      prefix: `${req.body.email}/${storageFolderName.quotations}/`,
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
      prefix: `${req.body.email}/${storageFolderName.bookmarks}/`,
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
      prefix: `${req.body.email}/${storageFolderName.files}/`,
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
      statistics.push(
        `${filesDeletedQty} bookmarks were deleted from bucket ✅`,
      )
    }

    const filesNotDeletedQty = filesDeleteRes.filter(
      (bookmarkDeletionRes) => bookmarkDeletionRes.status === 'rejected',
    ).length

    if (filesNotDeletedQty > 0) {
      statistics.push(
        `${filesNotDeletedQty} bookmarks were not deleted from bucket ❌`,
      )
    }

    return res
      .status(httpStatus.success_200)
      .json({ message: 'deleted', statistics })
  } catch (error) {
    next(error)
  }
}

deleteUserRouter.delete('/', (req, res, next) => {
  void deleteUser(req, res, next)
})
