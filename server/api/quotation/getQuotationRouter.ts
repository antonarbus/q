import { QuotationModel } from '@server/db/models/quotationModel'
import { bucket, storageFolderName } from '@server/services/storage'
import { getEmailFromRefreshToken } from '@server/utils/getEmailFromRefreshToken'
import { Router } from 'express'
import { type Quotation } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../../types'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  message:
    | 'not found in db'
    | 'not shared'
    | 'no permission to view'
    | 'not found in bucket'
    | 'owner permission'
    | 'viewer permission'
  quotation?: Quotation
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const email = getEmailFromRefreshToken(req)

    const document = await QuotationModel.findOneAndUpdate(
      { id },
      { openedAt: Date.now() },
      { new: true },
    ).lean()

    if (document === null) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found in db' })
    }

    const isOwner = email === document.email

    const isShared = document.sharedWith.length === 0
    const isSharedWithEverybody = document.sharedWith.at(0) === '*'
    const isSharedWithPerson = document.sharedWith.includes(
      email ?? 'no email here',
    )
    const isViewer = isSharedWithEverybody || isSharedWithPerson

    if (!isOwner && !isShared) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not shared' })
    }

    if (!isOwner && isShared && !isViewer) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'no permission to view' })
    }

    const filePath = `${document.email}/${storageFolderName.quotations}/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    if (!fileBuffer) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found in bucket' })
    }

    const quotation = JSON.parse(fileBuffer.toString())

    if (isOwner) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'owner permission', quotation })
    }

    if (isViewer) {
      // todo: remove sensitive data

      return res
        .status(httpStatus.success_200)
        .json({ message: 'viewer permission', quotation })
    }
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post('/', getQuotation)
