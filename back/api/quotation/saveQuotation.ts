import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { nanoid } from '@back/shared/lib/nanoid'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

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

export const saveQuotation: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { quotation } = req.body

  if (!quotation.id) {
    res.status(httpStatus.forbidden_403).json({ message: 'id is not provided' })

    return
  }

  const foundQuotation = await QuotationModel.findOne({ id: quotation.id })

  type QuotationOwnership = 'your new' | 'your existing' | 'foreign existing'

  const getQuotationOwnership = (): QuotationOwnership => {
    if (foundQuotation === null) {
      return 'your new'
    }

    if (foundQuotation.email === email) {
      return 'your existing'
    }

    // foundQuotation.email !== email
    return 'foreign existing'
  }

  const quotationOwnership = getQuotationOwnership()

  if (quotationOwnership === 'your new') {
    const quotationId = nanoid(5)

    const createResponse = await QuotationModel.create({
      id: quotationId,
      email,
      name: quotation.name,
      category: quotation.category,
      desc: quotation.desc,
      info: quotation.info,
      sharedWith: quotation.sharedWith,
      blocks: 'find in bucket under same id',
      updatedAt: Date.now(),
      createdAt: Date.now(),
      openedAt: Date.now(),
    })

    const quotationDataFromDb = createResponse.toObject()
    const filePath = getFilePath({ email, fileType: 'quotation', quotationId })
    const file = bucket.file(filePath)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    const quotationJson = JSON.stringify(fullQuotation, null, 2)
    await file.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'saved',
      quotation: fullQuotation,
    })

    return
  }

  if (quotationOwnership === 'your existing') {
    const updateResponse = await QuotationModel.findOneAndUpdate(
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

    const quotationDataFromDb = updateResponse.toObject()

    const filePath = getFilePath({
      email,
      fileType: 'quotation',
      quotationId: quotation.id,
    })

    const file = bucket.file(filePath)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    const quotationJson = JSON.stringify(fullQuotation, null, 2)
    await file.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'updated',
      quotation: fullQuotation,
    })

    return
  }

  // quotationOwnership === 'foreign existing'
  const quotationId = nanoid(5)

  const createResponse = await QuotationModel.create({
    id: quotationId,
    email,
    name: quotation.name,
    category: quotation.category,
    desc: quotation.desc,
    info: quotation.info,
    sharedWith: quotation.sharedWith,
    blocks: 'find in bucket under same id',
    updatedAt: Date.now(),
    createdAt: Date.now(),
    openedAt: Date.now(),
  })

  const quotationDataFromDb = createResponse.toObject()

  const filePath = getFilePath({
    email,
    fileType: 'quotation',
    quotationId,
  })

  const file = bucket.file(filePath)
  const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
  const quotationJson = JSON.stringify(fullQuotation, null, 2)
  await file.save(quotationJson)

  /*
  const regexp =
    /https:\/\/storage\.googleapis\.com\/quotation-app-bucket\/[^/]+\/files\/([^"\\\s]+)/g

  const fileNames = []
  let match: string[] | null = []

  while ((match = regexp.exec(quotationJson)) !== null) {
    fileNames.push(match[1]) // match[1] = file name
  }

  console.log(fileNames)

  */

  // todo: copy files and quotation for saving foreign quotation
  // todo: make it inside separate if statement
  // todo: need to copy files,get html and replaced links

  res.status(httpStatus.success_200).json({
    message: 'copied and saved',
    quotation: fullQuotation,
  })
}
