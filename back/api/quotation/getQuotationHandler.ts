import type { Request, Response, NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import { getShouldNotTrace } from '@back/shared/headers'
import { userRole } from '@back/shared/const/userRole'
import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'

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

export const getQuotationHandler: RouterHandler = async (req, res, next) => {
  const { id: quotationId } = req.body
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })

  const emptyQuotation: Quotation = {
    id: quotationId,
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
    res.status(httpStatus.notFound_404).json({
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
    res.status(httpStatus.forbidden_403).json({
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
    res.status(httpStatus.notFound_404).json({
      message: 'not found',
      quotation: emptyQuotation,
    })

    return
  }

  if (publicOrSharedWithYou === true) {
    // remove sensitive data from quotation
    // quotation.email = 'john@mail.com'
    delete quotationParsed.name
    delete quotationParsed.category
    delete quotationParsed.desc
    delete quotationParsed.info
    delete quotationParsed.createdAt
    delete quotationParsed.updatedAt
    delete quotationParsed.openedAt
    delete quotationParsed.from
    delete quotationParsed.to

    quotationParsed.blocks.forEach((block) => {
      // block.email = 'john@mail.com'
      delete block.name
      delete block.category
      delete block.desc
      delete block.info
      delete block.createdAt
      delete block.updatedAt

      if (block.type === 'boq') {
        block.boq.rows.forEach((row) => {
          // row.email = 'john@mail.com'
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

  res.status(httpStatus.success_200).json({
    message: 'found',
    quotation: { ...quotationDocument, ...quotationParsed, permissionLevel },
  })
}
