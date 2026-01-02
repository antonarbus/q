import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@root/shared/lib/nanoid'
import type { Quotation } from '@root/shared/types/Quotation'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  quotation: Quotation
}

export type ResBody = {
  message: string
  status: 'SAVED' | 'UPDATED' | 'COPIED'
  quotation: SelectQuotation
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FAILED_TO_SAVE' | 'ID_NOT_PROVIDED' | 'UNHANDLED_CASE'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const saveQuotationHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  if (req.body.quotation.id === '') {
    messageList.push('Quotation ID is not provided')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ID_NOT_PROVIDED',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  type QuotationOwnership = 'your new' | 'your existing' | 'foreign existing'

  const getQuotationOwnership = async (): Promise<QuotationOwnership> => {
    if (req.body.quotation.id === 'new') {
      return 'your new'
    }

    const [quotationSelected] = await db
      .select()
      .from(quotationsTable)
      .where(eq(quotationsTable.id, req.body.quotation.id))

    if (quotationSelected === undefined) {
      return 'your new'
    }

    if (quotationSelected.email === userFromAccessToken.email) {
      return 'your existing'
    }

    // foundQuotation.email !== email
    return 'foreign existing'
  }

  const quotationOwnership = await getQuotationOwnership()

  if (quotationOwnership === 'your new') {
    messageList.push('Creating new quotation')

    const quotationId = generateId()

    const [quotationInserted] = await db
      .insert(quotationsTable)
      .values({
        id: quotationId,
        email: userFromAccessToken.email,
        name: req.body.quotation.name,
        category: req.body.quotation.category,
        desc: req.body.quotation.desc,
        access: req.body.quotation.access,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        openedAt: new Date().toISOString(),
      })
      .returning()

    if (quotationInserted === undefined) {
      messageList.push('Failed to save quotation to database')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    }

    messageList.push('Quotation saved to database')

    const fileInfo = getFileInfo({ id: quotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationInserted,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson).catch(() => {
      messageList.push('Failed to save quotation to storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

    messageList.push('Quotation saved to storage')

    return httpResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
        quotation: quotationInserted,
        status: 'SAVED',
      },
    })
  }

  if (quotationOwnership === 'your existing') {
    messageList.push('Updating existing quotation')

    const [quotationUpdated] = await db
      .update(quotationsTable)
      .set({
        name: req.body.quotation.name,
        category: req.body.quotation.category,
        desc: req.body.quotation.desc,
        access: req.body.quotation.access,
        updatedAt: new Date().toISOString(),
      })
      .where(
        and(
          eq(quotationsTable.id, req.body.quotation.id),
          eq(quotationsTable.email, userFromAccessToken.email),
        ),
      )
      .returning()

    if (quotationUpdated === undefined) {
      messageList.push('Failed to update quotation in database')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    }

    messageList.push('Quotation updated in database')

    const fileInfo = getFileInfo({ id: req.body.quotation.id })
    const file = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationUpdated,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await file.save(quotationJson).catch(() => {
      messageList.push('Failed to save quotation to storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

    messageList.push('Quotation saved to storage')

    return httpResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
        quotation: quotationUpdated,
        status: 'UPDATED',
      },
    })
  }

  if (quotationOwnership === 'foreign existing') {
    messageList.push('Copying foreign quotation as new')

    const newQuotationId = generateId()

    const [quotationInserted] = await db
      .insert(quotationsTable)
      .values({
        id: newQuotationId,
        email: userFromAccessToken.email,
        name: req.body.quotation.name,
        category: req.body.quotation.category,
        desc: req.body.quotation.desc,
        access: req.body.quotation.access,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        openedAt: new Date().toISOString(),
      })
      .returning()

    if (quotationInserted === undefined) {
      messageList.push('Failed to save copied quotation to database')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    }

    messageList.push('Copied quotation saved to database')

    // const quotationDataFromDb = createResponse.toObject()
    const fileInfo = getFileInfo({ id: newQuotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationInserted,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson).catch(() => {
      messageList.push('Failed to save copied quotation to storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

    messageList.push('Copied quotation saved to storage')

    return httpResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
        quotation: quotationInserted,
        status: 'COPIED',
      },
    })
  }

  messageList.push('Unhandled case at the end')

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'UNHANDLED_CASE',
    statusCode: httpStatusCode.serverError500,
    message: messageList.join(' | '),
  })
}
