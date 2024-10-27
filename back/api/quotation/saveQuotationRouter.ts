import { Router } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation/types'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromRefreshTokenOrThrowUnauthorized } from '../../utils/getUserFromRefreshTokenOrThrowUnauthorized'
import { nanoid } from '@back/lib/nanoid'

export type ReqBody = {
  quotation: Quotation
}

type Message =
  | ErrorMessageCommon
  | 'not saved'
  | 'saved'
  | 'updated'
  | 'copied and saved'
  | 'id is not provided'
  | 'name is not provided'
  | 'category is not provided'

export type ResBody = {
  message: Message
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
    const { email } = getUserFromRefreshTokenOrThrowUnauthorized(req)

    const { quotation } = req.body

    if (!quotation.id) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'id is not provided' })
    }

    const isExistingYourQuotation =
      (await QuotationModel.findOne({
        id: quotation.id,
        email,
      })) !== null

    const isNewQuotation =
      (await QuotationModel.findOne({
        id: quotation.id,
      })) === null

    const isExistingForeignQuotationSavedAsYourNew =
      !isNewQuotation && !isExistingYourQuotation

    const isNew = isNewQuotation || isExistingForeignQuotationSavedAsYourNew

    const id = isExistingForeignQuotationSavedAsYourNew
      ? nanoid(5)
      : quotation.id

    const quotationDataFromDb = await QuotationModel.findOneAndUpdate(
      {
        id: quotation.id,
        email,
      },
      {
        id,
        email,
        name: quotation.name,
        category: quotation.category,
        desc: quotation.desc,
        info: quotation.info,
        sharedWith: quotation.sharedWith,
        blocks: 'find in bucket under same id',
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

    const filePath = `${email}/${storageFolderName.quotations}/${id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify(
      { ...quotationDataFromDb, blocks: quotation.blocks },
      null,
      2,
    )
    await file.save(contents)

    let message: Message = 'saved'

    if (isNewQuotation) message = 'saved'
    if (isExistingYourQuotation) message = 'updated'
    if (isExistingForeignQuotationSavedAsYourNew) message = 'copied and saved'

    return res.status(httpStatus.success_200).json({
      message,
      quotation: { ...quotationDataFromDb, blocks: quotation.blocks },
    })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyAccessTokenMiddleware, (req, res, next) => {
  void saveQuotation(req, res, next)
})
