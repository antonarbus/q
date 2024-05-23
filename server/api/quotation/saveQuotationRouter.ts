import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '@server/services/storage'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Quotation } from '@entities/quotation/types'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../../types'

export type ReqBody = {
  quotation: Quotation
}

export type ResBody = {
  message:
  | ErrorMessageCommon
  | 'not saved'
  | 'saved'
  | 'updated'
  | 'id is not provided'
  | 'name is not provided'
  | 'category is not provided'
  quotation?: FlattenMaps<Quotation>
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const { quotation } = req.body

    if (!quotation.id) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'id is not provided' })
    }

    const existingQuotation = await QuotationModel.findOne({
      id: quotation.id,
      email,
    })

    const isNew = existingQuotation === null

    const quotationDataFromDb = await QuotationModel.findOneAndUpdate(
      {
        id: quotation.id,
        email,
      },
      {
        id: quotation.id,
        email,
        name: quotation.name,
        category: quotation.category,
        desc: quotation.desc,
        info: quotation.info,
        sharedWith: quotation.sharedWith,
        items: 'find in bucket under same id',
        updatedAt: Date.now(),
        ...(isNew && { createdAt: Date.now() }),
        ...(isNew && { openedAt: Date.now() }),
      },
      {
        new: true,
        upsert: true,
      },
    )
      .select({ _id: 0, __v: 0 })
      .lean()

    if (!quotationDataFromDb) {
      return res.status(httpStatus.forbidden_403).json({ message: 'not saved' })
    }

    const filePath = `${email}/${storageFolderName.quotations}/${quotation.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify(
      { ...quotationDataFromDb, items: quotation.items },
      null,
      2,
    )
    await file.save(contents)

    return res.status(httpStatus.success_200).json({
      message: isNew ? 'saved' : 'updated',
      quotation: { ...quotationDataFromDb, items: quotation.items },
    })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyAccessTokenMiddleware, saveQuotation)
