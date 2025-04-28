import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFileInfo } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'
import { generateId } from '@back/shared/lib/nanoid'

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

export type ResBody = {
  message: Message
  quotation?: FlattenMaps<Quotation>
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const saveQuotationHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { quotation } = req.body

  if (!quotation.id) {
    res.status(httpStatus.forbidden_403).json({ message: 'id is not provided' })

    return
  }

  type QuotationOwnership = 'your new' | 'your existing' | 'foreign existing'

  const getQuotationOwnership = async (): Promise<QuotationOwnership> => {
    if (quotation.id === 'new') {
      return 'your new'
    }

    const foundQuotation = await QuotationModel.findOne({ id: quotation.id })

    if (foundQuotation === null) {
      return 'your new'
    }

    if (foundQuotation.email === email) {
      return 'your existing'
    }

    // foundQuotation.email !== email
    return 'foreign existing'
  }

  const quotationOwnership = await getQuotationOwnership()

  if (quotationOwnership === 'your new') {
    const quotationId = generateId()

    const createQuotationResponse = await QuotationModel.create({
      id: quotationId,
      email,
      name: quotation.name,
      category: quotation.category,
      desc: quotation.desc,
      info: quotation.info,
      sharedWith: quotation.sharedWith,
      blocks: 'too big to keep in db, find it in the bucket under same id',
      updatedAt: Date.now(),
      createdAt: Date.now(),
      openedAt: Date.now(),
    })

    const quotationDataFromDb = createQuotationResponse.toObject()

    const { path } = getFileInfo({
      fileType: 'quotation',
      id: quotationId,
    })

    const quotationFile = bucket.file(path)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'saved',
      quotation: fullQuotation,
    })

    return
  }

  if (quotationOwnership === 'your existing') {
    const updateQuotationResponse = await QuotationModel.findOneAndUpdate(
      {
        id: quotation.id,
        email,
      },
      {
        name: quotation.name,
        category: quotation.category,
        desc: quotation.desc,
        info: quotation.info,
        sharedWith: quotation.sharedWith,
        blocks: 'to be found in bucket under same id',
        updatedAt: Date.now(),
      },
      {
        new: true,
        upsert: true,
      },
    )

    const quotationDataFromDb = updateQuotationResponse.toObject()

    const { path } = getFileInfo({
      fileType: 'quotation',
      id: quotation.id,
    })

    const file = bucket.file(path)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    const quotationJson = JSON.stringify(fullQuotation, null, 2)
    await file.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'updated',
      quotation: fullQuotation,
    })

    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (quotationOwnership === 'foreign existing') {
    const newQuotationId = generateId()

    const createResponse = await QuotationModel.create({
      id: newQuotationId,
      email,
      name: quotation.name,
      category: quotation.category,
      desc: quotation.desc,
      info: quotation.info,
      sharedWith: [],
      blocks: 'find in bucket under same id',
      updatedAt: Date.now(),
      createdAt: Date.now(),
      openedAt: Date.now(),
    })

    const quotationDataFromDb = createResponse.toObject()

    const { path } = getFileInfo({
      fileType: 'quotation',
      id: newQuotationId,
    })

    const quotationFile = bucket.file(path)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    const quotationJson = JSON.stringify(fullQuotation, null, 2)

    await quotationFile.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'copied and saved',
      quotation: fullQuotation,
    })
  }
}
