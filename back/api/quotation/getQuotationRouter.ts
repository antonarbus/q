import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { jsonParseSafe } from '@back/shared/utils/jsonParseSafe'
import { isNoTraceMode } from '@back/shared/headers'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  quotation: Quotation
  // permissionLevel?: PermissionLevel
  message: 'found' | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  const { id: quotationId } = req.body
  const { email, roles } = getUserFromRefreshToken({ req })

  const emptyQuotation: Quotation = {
    id: quotationId,
    type: 'quotation',
    email: 'john@gmail.com',
    blocks: [],
  }

  const document = await QuotationModel.findOne({ id: quotationId }).lean()

  if (document === null) {
    res.status(httpStatus.notFound_404).json({
      message: 'not found',
      quotation: emptyQuotation,
    })

    return
  }

  const getPermissionLevel = (): Quotation['permissionLevel'] => {
    if (email === document.email) {
      return 'Owner'
    }

    if ((document.sharedWith ?? []).includes(email)) {
      return 'Shared with you'
    }

    if ((document.sharedWith ?? []).at(0) === '*') {
      return 'Public'
    }

    if (isNoTraceMode({ req })) {
      return 'Super admin on behalf of a user'
    }

    if (roles.includes(userRole.superAdmin)) {
      return 'Super admin'
    }

    return 'Forbidden'
  }

  const permissionLevel = getPermissionLevel()

  if (permissionLevel === 'Forbidden') {
    res
      .status(httpStatus.forbidden_403)
      .json({ message: 'found', quotation: emptyQuotation })

    return
  }

  if (permissionLevel === 'Owner') {
    await QuotationModel.updateOne(
      { id: quotationId },
      { openedAt: Date.now() },
    ).catch((error: unknown) => {
      console.error('failed to update openedAt field', error)
    })
  }

  if (permissionLevel === 'Shared with you' || permissionLevel === 'Public') {
    // todo: add and save new field "viewedAt"
  }

  const filePath = getFilePath({
    email: document.email,
    fileType: 'quotation',
    quotationId,
  })

  const [fileBuffer] = await bucket.file(filePath).download()
  const quotation = jsonParseSafe<Quotation>(fileBuffer.toString())

  if (!quotation) {
    res.status(httpStatus.notFound_404).json({
      message: 'not found',
      quotation: emptyQuotation,
    })

    return
  }

  if (permissionLevel === 'Shared with you' || permissionLevel === 'Public') {
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
  }

  quotation.permissionLevel = permissionLevel

  res.status(httpStatus.success_200).json({
    message: 'found',
    quotation,
  })
}

getQuotationRouter.post('/', asyncHandler(getQuotation))
