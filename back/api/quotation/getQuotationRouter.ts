import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { jsonParseSafe } from '@back/shared/utils/jsonParseSafe'
import { isNoTraceCookie } from '@back/shared/headers'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  quotation: Quotation
  message:
    | 'not found in db'
    | 'not shared'
    | 'no permission to view'
    | 'not found in bucket'
    | 'owner permission'
    | 'viewer permission'
    | 'super-admin permission'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  const { id: quotationId } = req.body
  const isNoTraceMode = isNoTraceCookie({ req })

  const quotationWithOnlyId: Quotation = {
    id: quotationId,
    type: 'quotation',
    email: 'john@gmail.com',
    blocks: [],
  }

  const document = isNoTraceMode
    ? await QuotationModel.findOne({ id: quotationId }).lean()
    : await QuotationModel.findOneAndUpdate(
        { id: quotationId },
        { openedAt: Date.now() },
        { new: true },
      ).lean()

  if (document === null) {
    res
      .status(httpStatus.notFound_404)
      .json({ message: 'not found in db', quotation: quotationWithOnlyId })

    return
  }

  // this is probably not very good to do, but i am taking user information from refresh token here
  // with access token it does not serve the purpose here
  const { email, roles } = getUserFromRefreshToken({ req })
  const isOwner = email === document.email
  const isShared = (document.sharedWith ?? []).length !== 0
  const isSharedWithEverybody = (document.sharedWith ?? []).at(0) === '*'
  const isSharedWithPerson = (document.sharedWith ?? []).includes(email)
  const isViewer = isSharedWithEverybody || isSharedWithPerson
  const isSuperAdmin = roles.includes(userRole.superAdmin)

  if (!isOwner && !isShared && !isSuperAdmin) {
    res.status(httpStatus.forbidden_403).json({
      message: 'not shared',
      quotation: quotationWithOnlyId,
    })

    return
  }

  if (!isOwner && isShared && !isViewer && !isSuperAdmin) {
    res.status(httpStatus.forbidden_403).json({
      message: 'no permission to view',
      quotation: quotationWithOnlyId,
    })

    return
  }

  const filePath = getFilePath({
    email: document.email,
    fileType: 'quotation',
    quotationId,
  })

  const [fileBuffer] = await bucket.file(filePath).download()
  const quotation = jsonParseSafe<Quotation>(fileBuffer.toString())

  if (!quotation) {
    res
      .status(httpStatus.notFound_404)
      .json({ message: 'not found in bucket', quotation: quotationWithOnlyId })

    return
  }

  if (isSuperAdmin) {
    res
      .status(httpStatus.success_200)
      .json({ message: 'super-admin permission', quotation })

    return
  }

  if (isOwner) {
    res
      .status(httpStatus.success_200)
      .json({ message: 'owner permission', quotation })

    return
  }

  // remove sensitive data from quotation
  if (isViewer) {
    quotation.email = 'john@mail.com'
    delete quotation.name
    delete quotation.category
    delete quotation.desc
    delete quotation.info
    delete quotation.createdAt
    delete quotation.updatedAt
    delete quotation.openedAt
    delete quotation.from
    delete quotation.to

    quotation.blocks.forEach((block) => {
      block.email = 'john@mail.com'
      delete block.name
      delete block.category
      delete block.desc
      delete block.info
      delete block.createdAt
      delete block.updatedAt

      if (block.type === 'boq') {
        block.boq.rows.forEach((row) => {
          row.email = 'john@mail.com'
          delete row.name
          delete row.category
          delete row.desc
          delete row.info
          delete row.createdAt
          delete row.updatedAt
        })
      }
    })

    res.status(httpStatus.success_200).json({
      message: 'viewer permission',
      quotation,
    })
  }
}

getQuotationRouter.post('/', asyncHandler(getQuotation))
