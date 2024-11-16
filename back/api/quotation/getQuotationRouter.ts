import { Router } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'
import { getUserFromRefreshToken } from '@back/utils/jwt'

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
      // remove sensitive data from quotation
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
      delete quotation.sharedWith

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

      return res.status(httpStatus.success_200).json({
        message: 'viewer permission',
        quotation,
      })
    }
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post('/', (req, res, next) => {
  void getQuotation(req, res, next)
})
