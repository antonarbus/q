import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@back/shared/lib/nanoid'
import type { Quotation } from '@entities/quotation/type'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'

export type ReqBody = {
  quotation: Quotation
}

export type ResBody = {
  message: 'saved' | 'updated' | 'copied and saved'
  quotation: SelectQuotation
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'not saved' | 'id is not provided'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const saveQuotationHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (req.body.quotation.id === '') {
    res.status(httpStatus.forbidden403).json({ message: 'id is not provided' })

    return
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
        info: req.body.quotation.info,
        access: req.body.quotation.access,
        updatedAt: new Date(),
        createdAt: new Date(),
        openedAt: new Date(),
        // blocks: 'too big to keep in db, find it in the bucket under same id',
      })
      .returning()

    if (quotationInserted === undefined) {
      res.status(httpStatus.serverError500).json({ message: 'not saved' })

      return
    }

    const fileInfo = getFileInfo({ id: quotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...quotationInserted,
      blocks: req.body.quotation.blocks,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson)

    res.status(httpStatus.success200).json({
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
        info: req.body.quotation.info,
        access: req.body.quotation.access,
        updatedAt: new Date(),
        // blocks: 'too big to keep in db, find it in the bucket under same id',
      })
      .where(
        and(
          eq(quotationsTable.id, req.body.quotation.id),
          eq(quotationsTable.email, userFromAccessToken.email),
        ),
      )
      .returning()

    if (quotationUpdated === undefined) {
      res.status(httpStatus.serverError500).json({ message: 'not saved' })

      return
    }

    const fileInfo = getFileInfo({ id: req.body.quotation.id })
    const file = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...quotationUpdated,
      blocks: req.body.quotation.blocks,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)
    await file.save(quotationJson)

    res.status(httpStatus.success200).json({
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
        info: req.body.quotation.info,
        access: req.body.quotation.access,
        updatedAt: new Date(),
        createdAt: new Date(),
        openedAt: new Date(),
        // blocks: 'too big to keep in db, find it in the bucket under same id',
      })
      .returning()

    if (quotationInserted === undefined) {
      res.status(httpStatus.serverError500).json({ message: 'not saved' })

      return
    }

    // const quotationDataFromDb = createResponse.toObject()
    const fileInfo = getFileInfo({ id: newQuotationId })
    const quotationFile = bucket.file(fileInfo.path)

    const fullQuotation = {
      ...quotationInserted,
      blocks: req.body.quotation.blocks,
    }

    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson)

    res.status(httpStatus.success200).json({
      message: 'copied and saved',
      quotation: quotationInserted,
    })
  }
}
