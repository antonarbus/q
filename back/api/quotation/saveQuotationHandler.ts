import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { nanoid } from '@back/shared/lib/nanoid'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'
import type {
  CopyResponse,
  MakeFilePublicResponse,
} from '@google-cloud/storage'

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

    const createQuotationResponse = await QuotationModel.create({
      id: quotationId,
      email,
      name: quotation.name,
      category: quotation.category,
      desc: quotation.desc,
      info: quotation.info,
      files: quotation.files,
      sharedWith: quotation.sharedWith,
      blocks: 'too big to keep in db, find it in the bucket under same id',
      updatedAt: Date.now(),
      createdAt: Date.now(),
      openedAt: Date.now(),
    })

    const quotationDataFromDb = createQuotationResponse.toObject()

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
        files: quotation.files,
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (quotationOwnership === 'foreign existing') {
    const newQuotationId = nanoid(5)

    const createResponse = await QuotationModel.create({
      id: newQuotationId,
      email,
      name: quotation.name,
      category: quotation.category,
      desc: quotation.desc,
      info: quotation.info,
      files: quotation.files,
      sharedWith: [],
      blocks: 'find in bucket under same id',
      updatedAt: Date.now(),
      createdAt: Date.now(),
      openedAt: Date.now(),
    })

    const quotationDataFromDb = createResponse.toObject()

    const quotationFilePath = getFilePath({
      email,
      fileType: 'quotation',
      quotationId: newQuotationId,
    })

    const quotationFile = bucket.file(quotationFilePath)
    const fullQuotation = { ...quotationDataFromDb, blocks: quotation.blocks }
    let quotationJson = JSON.stringify(fullQuotation, null, 2)

    const shouldCopyFilesToNewUserBucket =
      (quotationDataFromDb.files ?? []).length > 0

    if (shouldCopyFilesToNewUserBucket) {
      const copyFilePromises: Promise<CopyResponse>[] = []

      for (const fileInfo of quotationDataFromDb.files ?? []) {
        const originalFilePath = getFilePath({
          email: quotation.email,
          fileType: 'file',
          fileName: fileInfo.fileName,
        })

        const newFilePath = getFilePath({
          email,
          fileType: 'file',
          fileName: fileInfo.fileName,
        })

        const originalFile = bucket.file(originalFilePath)

        const newFile = bucket.file(newFilePath)

        newFile.metadata = {
          oldOwnerEmail: quotation.email,
          newOwnerEmail: email,
          fileName: fileInfo.fileName,
        }

        const copyFilePromise = originalFile.copy(newFile)

        copyFilePromises.push(copyFilePromise)
      }

      const copyResponses = await Promise.allSettled(copyFilePromises)

      const makeFilePublicPromises: Promise<MakeFilePublicResponse>[] = []

      copyResponses.forEach((response) => {
        if (response.status === 'fulfilled') {
          const copiedFile = response.value[0]

          const makeFilePublicPromise = copiedFile.makePublic()
          makeFilePublicPromises.push(makeFilePublicPromise)

          const metadata = copiedFile.metadata as {
            oldOwnerEmail: string
            newOwnerEmail: string
            fileName: string
          }

          const textToReplace = `${metadata.oldOwnerEmail}/files/${metadata.fileName}`
          const newText = `${metadata.newOwnerEmail}/files/${metadata.fileName}`

          quotationJson = quotationJson.replace(textToReplace, newText)
        }
      })

      await Promise.all(makeFilePublicPromises)
    }

    await quotationFile.save(quotationJson)

    res.status(httpStatus.success_200).json({
      message: 'copied and saved',
      quotation: fullQuotation,
    })
  }
}
