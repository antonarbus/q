import { getUserFromAccessTokenOrNull } from '@back/entity/user/getUserFromAccessTokenOrNull'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseOrNull } from '@back/shared/util/jsonParseOrNull'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import {
  quotationsTable,
  type SelectQuotation,
} from '@back/entity/quotation/db/quotationsTableSchema'
import type { Quotation } from '@back/entity/quotation/schema'
import { createEmptyQuotation } from '@back/entity/quotation/createEmptyQuotation'
import { getQuotationPermissionLevel } from '@back/entity/quotation/getQuotationPermissionLevel'
import { getShouldTrace } from '@back/shared/headers/no-trace/getShouldTrace'
import { hideQuotationPrivateData } from '@back/entity/quotation/hideQuotationPrivateData'
import { validateQuotation } from '@back/entity/quotation/validateQuotation'

type SearchQuery = ParsedQs

export type UrlParam = {
  id: SelectQuotation['id']
}

type ReqBody = undefined

export type ResBody = {
  quotation: Quotation
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'QUOTATION_NOT_FOUND'
    | 'QUOTATION_STORAGE_NOT_FOUND'
    | 'QUOTATION_VALIDATION_ERROR'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getQuotationHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })

  const messageList: string[] = []

  const [quotationSelected] = await db
    .select()
    .from(quotationsTable)
    .where(eq(quotationsTable.id, req.params.id))

  if (quotationSelected === undefined) {
    messageList.push('Quotation not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  const shouldTrace = getShouldTrace({ req })

  messageList.push(`Should trace: ${shouldTrace}`)

  const quotationPermissionLevel = getQuotationPermissionLevel({
    user: userFromAccessToken,
    quotationEmail: quotationSelected.email,
    quotationAccess: quotationSelected.access,
    shouldTrace,
  })

  messageList.push(`Permission level: ${quotationPermissionLevel}`)

  if (quotationPermissionLevel === 'FORBIDDEN') {
    const emptyQuotation = createEmptyQuotation({
      id: req.params.id,
      permissionLevel: 'FORBIDDEN',
    })

    return httpJsonResponse({
      statusCode: httpStatusCode.success200,
      body: {
        quotation: emptyQuotation,
        message: messageList.join(' | '),
      },
    })
  }

  const publicOrSharedWithYou =
    quotationPermissionLevel === 'SHARED' ||
    quotationPermissionLevel === 'PUBLIC'

  let quotationUpdated: SelectQuotation | undefined = undefined

  if (shouldTrace === true) {
    if (quotationPermissionLevel === 'OWNER') {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          openedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.params.id))
        .returning()
        .catch((error: unknown) => {
          messageList.push('Failed to update "openedAt" field')
          console.error('failed to update "openedAt" field', error)

          return []
        })

      quotationUpdated = updateResponse.at(0)

      if (quotationUpdated !== undefined) {
        messageList.push('Updated "openedAt" field')
      }
    }

    if (publicOrSharedWithYou === true) {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          viewedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.params.id))
        .returning()
        .catch((error: unknown) => {
          messageList.push('Failed to update "viewedAt" field')
          console.error('failed to update viewedAt field', error)

          return []
        })

      quotationUpdated = updateResponse.at(0)

      if (quotationUpdated !== undefined) {
        messageList.push('Updated "viewedAt" field')
      }
    }
  }

  const fileInfo = getFileInfo({ id: req.params.id })

  const [fileBuffer] = await bucket
    .file(fileInfo.path)
    .download()
    .catch(() => {
      messageList.push('Quotation data not found in storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'QUOTATION_STORAGE_NOT_FOUND',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

  messageList.push('Quotation loaded from storage')

  const quotationFileAsString = fileBuffer.toString()
  const quotationJsonParsed = jsonParseOrNull<Quotation>(quotationFileAsString)

  const quotationValidationResult = validateQuotation({
    document: quotationJsonParsed ?? {},
  })

  messageList.push(quotationValidationResult.message)

  if (quotationValidationResult.status === 'ERROR') {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_VALIDATION_ERROR',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  const quotation: Quotation = {
    ...quotationValidationResult.data,
    viewedAt:
      quotationUpdated === undefined
        ? quotationValidationResult.data.viewedAt
        : quotationUpdated.viewedAt,
    openedAt:
      quotationUpdated === undefined
        ? quotationValidationResult.data.openedAt
        : quotationUpdated.openedAt,
    permissionLevel: quotationPermissionLevel,
  }

  if (publicOrSharedWithYou === true) {
    hideQuotationPrivateData({ quotation })
    messageList.push('Private data is hidden')
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      quotation,
      message: messageList.join(' | '),
    },
  })
}
