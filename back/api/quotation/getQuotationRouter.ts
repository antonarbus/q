import { Router } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromRefreshToken } from '../../utils/getUserFromRefreshToken'
import { removeSensitiveDataFromQuotation } from '../../utils/removeSensitiveDataFromQuotation'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  quotation?: Quotation
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
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

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

    const { email, roles } = getUserFromRefreshToken(req)

    const isOwner = email === document.email

    const isShared = (document.sharedWith ?? []).length !== 0
    const isSharedWithEverybody = (document.sharedWith ?? []).at(0) === '*'
    const isSharedWithPerson = (document.sharedWith ?? []).includes(email)
    const isViewer = isSharedWithEverybody || isSharedWithPerson
    const isSuperAdmin = roles.includes('super-admin')

    if (!isOwner && !isShared && !isSuperAdmin) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not shared' })
    }

    if (!isOwner && isShared && !isViewer && !isSuperAdmin) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'no permission to view' })
    }

    const filePath = `${document.email}/${storageFolderName.quotations}/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    const quotation = jsonParseSafe<Quotation>(fileBuffer.toString())

    if (!quotation) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found in bucket' })
    }

    if (isSuperAdmin) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'super-admin permission', quotation })
    }

    if (isOwner) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'owner permission', quotation })
    }

    if (isViewer) {
      const quotationWithoutSensitiveData = removeSensitiveDataFromQuotation({
        quotation,
      })

      return res.status(httpStatus.success_200).json({
        message: 'viewer permission',
        quotation: quotationWithoutSensitiveData,
      })
    }
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post('/', (req, res, next) => {
  void getQuotation(req, res, next)
})
