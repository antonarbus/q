import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { bucket } from '@server/services/storage'
import express from 'express'
import type { Next, ReqWithBody, ResWithBody } from '../types'

export type ReqBody = {
  // quotation: Quotation
  // items: ItemType[]
  // id: string
}

export type ResBody = {
  // message: string
  // document: HydratedDocument<QuotationModelType> | null
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const uploadRouter = express.Router()

const upload: RouterHandler = async (req, res, next) => {
  try {
    if (req.file === undefined) return
    const { id, email } = req.body
    const { fileName, link } = await uploadFileIntoMemory({ file: req.file, email, id })

    const fileInfo = {
      link,
      origName: req.file.originalname,
      size: req.file.size / 1024 / 1024,
      date: new Date(),
    }
    // todo: send fileInfo into quotation collection DB
    // todo: add types

    res.status(200).json({ link })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

uploadRouter.post(
  '/',
  // verifyTokenMiddleware, // todo: do not know how to use axios instance with froala update to validate jwt
  upload,
)

// https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876

async function uploadFileIntoMemory({ file, email, id }: {
  file: Express.Multer.File
  email: string
  id: string
}): Promise<{ link: string, fileName: string }> {
  return await new Promise((resolve, reject) => {
    const originalNameUtf8 = Buffer.from(file.originalname, 'ascii').toString('utf8')
    const fileName = `${email}/${id}/${originalNameUtf8}`
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({ resumable: false })
    blobStream
      .on('finish', async () => {
        await bucket.file(fileName).makePublic()
        const link = `https://storage.googleapis.com/${bucket.name}/${fileName}`
        resolve({ link, fileName })
      })
      .on('error', (error) => {
        console.error(error)
        reject(new Error('Unable to upload file, something went wrong'))
      })
      .end(file.buffer)
  })
}
