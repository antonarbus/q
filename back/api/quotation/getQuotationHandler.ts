import { QuotationModel } from '@back/entities/quotation'
import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import { getShouldNotTrace } from '@back/shared/headers'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Quotation } from '@entities/quotation/type'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  quotation: Quotation
  message: 'found'
}

export type ErrorResBody = {
  quotation: Quotation
  message: ErrorMessageCommon | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationHandler: RouterHandler = async (req, res, _next) => {
  const { id: quotationId } = req.body
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })

  const emptyQuotation: Quotation = {
    id: quotationId,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'quotation',
    email: 'john@gmail.com',
    access: {
      level: 'nobody',
      userList: [],
    },
    blocks: [],
  }

  const quotationDocumentRaw = await QuotationModel.findOne({ id: quotationId })

  if (quotationDocumentRaw === null) {
    res.status(httpStatus.notFound404).json({
      message: 'not found',
      quotation: emptyQuotation,
    })

    return
  }

  const quotationDocument = quotationDocumentRaw.toObject({ getters: true })

  const shouldNotTrace = getShouldNotTrace({ req })

  const getPermissionLevel = (): Quotation['permissionLevel'] => {
    const isLoggedUser = userFromAccessToken !== null
    const emailFromToken = userFromAccessToken?.email

    const isOwner = isLoggedUser && emailFromToken === quotationDocument.email

    if (isOwner === true) {
      return 'Owner'
    }

    const isSharedWithYou =
      emailFromToken !== undefined &&
      quotationDocument.access.level === 'custom' &&
      quotationDocument.access.userList.includes(emailFromToken)

    if (isSharedWithYou === true) {
      return 'Shared with you'
    }

    const isSharedWithEveryone = quotationDocument.access.level === 'everyone'

    if (isSharedWithEveryone === true) {
      return 'Public'
    }

    const isSuperAdminOnBehalfOfUser = isLoggedUser && shouldNotTrace

    if (isSuperAdminOnBehalfOfUser === true) {
      return 'Super admin on behalf of a user'
    }

    const isSuperAdmin =
      isLoggedUser && userFromAccessToken.roles.includes(userRole.superAdmin)

    if (isSuperAdmin === true) {
      return 'Super admin'
    }

    return 'Forbidden'
  }

  const permissionLevel = getPermissionLevel()

  if (permissionLevel === 'Forbidden') {
    res.status(httpStatus.forbidden403).json({
      message: 'found',
      quotation: { ...emptyQuotation, permissionLevel },
    })

    return
  }

  const publicOrSharedWithYou =
    permissionLevel === 'Shared with you' || permissionLevel === 'Public'

  if (shouldNotTrace === false) {
    if (permissionLevel === 'Owner') {
      await QuotationModel.updateOne(
        { id: quotationId },
        { openedAt: Date.now() },
      ).catch((error: unknown) => {
        console.error('failed to update openedAt field', error)
      })
    }

    if (publicOrSharedWithYou === true) {
      await QuotationModel.updateOne(
        { id: quotationId },
        { viewedAt: Date.now() },
      ).catch((error: unknown) => {
        console.error('failed to update viewedAt field', error)
      })
    }
  }

  const { path } = getFileInfo({ id: quotationId })
  const [fileBuffer] = await bucket.file(path).download()
  const quotationJson = fileBuffer.toString()
  const quotationParsed = jsonParseSafe<Quotation>(quotationJson)

  if (quotationParsed === undefined) {
    res.status(httpStatus.notFound404).json({
      message: 'not found',
      quotation: emptyQuotation,
    })

    return
  }

  if (publicOrSharedWithYou === true) {
    // remove sensitive data from quotation
    // quotation.email = 'john@mail.com'
    quotationParsed.name = 'private'
    quotationParsed.category = 'private'
    quotationParsed.desc = 'private'
    quotationParsed.info = 'private'
    quotationParsed.createdAt = new Date()
    quotationParsed.updatedAt = new Date()
    quotationParsed.openedAt = new Date()

    quotationParsed.blocks.forEach((block) => {
      // block.email = 'john@mail.com'
      block.name = 'private'
      block.category = 'private'
      block.desc = 'private'
      block.info = 'private'
      block.createdAt = new Date()
      block.updatedAt = new Date()

      if (block.type === 'boq') {
        block.boq.rows.forEach((row) => {
          // row.email = 'john@mail.com'
          row.name = 'private'
          row.category = 'private'
          row.desc = 'private'
          row.info = 'private'
          row.createdAt = new Date()
          row.updatedAt = new Date()
        })
      }
    })
  }

  res.status(httpStatus.success200).json({
    message: 'found',
    quotation: { ...quotationDocument, ...quotationParsed, permissionLevel },
  })
}
