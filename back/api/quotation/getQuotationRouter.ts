import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '@back/consts/httpStatus'
import { QuotationModel } from '@back/db/models/quotationModel'
import { bucket, storageFolderName } from '@back/services/storage'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'
import {
  isNoTraceModeEnabled,
  getUserFromRefreshToken,
} from '@back/utils/headers'

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
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const isNoTraceMode = isNoTraceModeEnabled(req)

    const document = isNoTraceMode
      ? await QuotationModel.findOne({ id }).lean()
      : await QuotationModel.findOneAndUpdate(
          { id },
          { openedAt: Date.now() },
          { new: true },
        ).lean()

    if (document === null) {
      res.status(httpStatus.notFound_404).json({ message: 'not found in db' })

      return
    }

    // this is probably not very good to do, but i am taking user information from refresh token here
    // with access token it does not serve the purpose here
    const { email, roles } = getUserFromRefreshToken(req)

    const isOwner = email === document.email

    const isShared = (document.sharedWith ?? []).length !== 0
    const isSharedWithEverybody = (document.sharedWith ?? []).at(0) === '*'
    const isSharedWithPerson = (document.sharedWith ?? []).includes(email)
    const isViewer = isSharedWithEverybody || isSharedWithPerson
    const isSuperAdmin = roles.includes('super-admin')

    if (!isOwner && !isShared && !isSuperAdmin) {
      res.status(httpStatus.forbidden_403).json({ message: 'not shared' })

      return
    }

    if (!isOwner && isShared && !isViewer && !isSuperAdmin) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'no permission to view' })

      return
    }

    const filePath = `${document.email}/${storageFolderName.quotations}/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    const quotation = jsonParseSafe<Quotation>(fileBuffer.toString())

    if (!quotation) {
      res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found in bucket' })

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

      res.status(httpStatus.success_200).json({
        message: 'viewer permission',
        quotation,
      })
    }
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post('/', getQuotation)
