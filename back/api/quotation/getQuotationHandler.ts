import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseOrNull } from '@back/shared/util/jsonParseOrNull'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import {
  quotationBucketDataSchema,
  type Quotation,
} from '@back/entities/quotation/quotationSchema'
import { z } from 'zod'
import { createEmptyQuotation } from '@back/entities/quotation/createEmptyQuotation'
import { getQuotationPermissionLevel } from '@back/entities/quotation/getQuotationPermissionLevel'
import { getShouldTrace } from '@back/shared/headers/no-trace/getShouldTrace'
import { hideQuotationPrivateData } from '@back/entities/quotation/hideQuotationPrivateData'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  id: SelectQuotation['id']
}

export type ResBody = {
  quotation: Quotation
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'QUOTATION_NOT_FOUND'
    | 'FILE_NOT_FOUND_IN_BUCKET'
    | 'INVALID_JSON'
    | 'INVALID_STRUCTURE'
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
    .where(eq(quotationsTable.id, req.body.id))

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
    return httpJsonResponse({
      statusCode: httpStatusCode.success200,
      body: {
        quotation: {
          ...createEmptyQuotation({ id: req.body.id }),
          permissionLevel: quotationPermissionLevel,
        },
        message: messageList.join(' | '),
      },
    })
  }

  const publicOrSharedWithYou =
    quotationPermissionLevel === 'SHARED' ||
    quotationPermissionLevel === 'PUBLIC'

  if (shouldTrace === true) {
    if (quotationPermissionLevel === 'OWNER') {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          openedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.body.id))
        .catch((error: unknown) => {
          messageList.push('Failed to update "openedAt" field')
          console.error('failed to update "openedAt" field', error)
        })

      if (updateResponse !== undefined && updateResponse.rowCount > 0) {
        messageList.push('Updated "openedAt" field')
      }
    }

    if (publicOrSharedWithYou === true) {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          viewedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.body.id))
        .catch((error: unknown) => {
          messageList.push('Failed to update "viewedAt" field')
          console.error('failed to update viewedAt field', error)
        })

      if (updateResponse !== undefined && updateResponse.rowCount > 0) {
        messageList.push('Updated "viewedAt" field')
      }
    }
  }

  const fileInfo = getFileInfo({ id: req.body.id })

  const [fileBuffer] = await bucket
    .file(fileInfo.path)
    .download()
    .catch(() => {
      messageList.push('Quotation data not found in storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FILE_NOT_FOUND_IN_BUCKET',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

  const quotationJson = fileBuffer.toString()
  const quotationJsonParsed = jsonParseOrNull<Quotation>(quotationJson)

  if (quotationJsonParsed === null) {
    messageList.push('Invalid JSON')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INVALID_JSON',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  const quotationValidationResult =
    quotationBucketDataSchema.safeParse(quotationJsonParsed)

  if (quotationValidationResult.success === false) {
    messageList.push('Invalid structure')
    const treeifiedError = z.treeifyError(quotationValidationResult.error)
    console.error('Validation failed:', treeifiedError)
    messageList.push(`Zod error: ${JSON.stringify(treeifiedError)}`)

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INVALID_STRUCTURE',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  const quotationBucketData = quotationValidationResult.data

  const quotation: Quotation = {
    ...quotationSelected,
    ...quotationBucketData,
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
