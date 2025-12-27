import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@back/shared/lib/nanoid'
import type { Quotation } from '@root/shared/types/Quotation'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  quotation: Quotation
}

export type ResBody = {
  message: 'saved' | 'updated' | 'copied and saved'
  quotation: SelectQuotation
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FAILED_TO_SAVE' | 'ID_NOT_PROVIDED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const saveQuotationHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (req.body.quotation.id === '') {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ID_NOT_PROVIDED',
      statusCode: httpStatusCode.forbidden403,
      message: 'Quotation ID is not provided',
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
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to save quotation meta data',
      })
    }

    const fileInfo = getFileInfo({ id: quotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationInserted,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson).catch(() => {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to save quotation in bucket',
      })
    })

    res.status(httpStatusCode.success200).json({
      message: 'saved',
      quotation: quotationInserted,
    })

    return
  }

  if (quotationOwnership === 'your existing') {
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
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to update existing quotation',
      })
    }

    const fileInfo = getFileInfo({ id: req.body.quotation.id })
    const file = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationUpdated,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await file.save(quotationJson).catch(() => {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to save quotation in bucket',
      })
    })

    res.status(httpStatusCode.success200).json({
      message: 'updated',
      quotation: quotationUpdated,
    })

    return
  }

  if (quotationOwnership === 'foreign existing') {
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
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to copy and save quotation',
      })
    }

    // const quotationDataFromDb = createResponse.toObject()
    const fileInfo = getFileInfo({ id: newQuotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...req.body.quotation,
      ...quotationInserted,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson).catch(() => {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FAILED_TO_SAVE',
        statusCode: httpStatusCode.serverError500,
        message: 'Failed to save quotation in bucket',
      })
    })

    res.status(httpStatusCode.success200).json({
      message: 'copied and saved',
      quotation: quotationInserted,
    })
  }
}
