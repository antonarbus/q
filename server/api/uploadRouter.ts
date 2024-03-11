import { QuotationModel } from '@server/db/models/quotationModel'
import { bucket } from '@server/services/storage'
import express from 'express'
import type { Next, ReqWithBody, ResWithBody } from '../types'
// import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'

export type ReqBody = {
  id?: string
  email?: string
}

export type ResBody = {
  message: string
  link: string | null
  name: string | null
  size: number | null
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const uploadRouter = express.Router()

const upload: RouterHandler = async (req, res, next) => {
  try {
    const { id, email } = req.body
    const { file } = req

    if (id === undefined || email === undefined || file === undefined) {
      return res.status(200).json({
        message: 'not uploaded',
        link: null,
        name: null,
        size: null,
      })
    }

    const { name, link, size } = await uploadFileIntoMemory({ file, email, id })

    const document = await QuotationModel.findOne({ email, id })

    if (document?.files !== undefined) {
      document.files.push({ name, size })
      await document.save()
    }

    return res.status(200).json({
      message: 'uploaded',
      link,
      name,
      size,
    })
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
}): Promise<{ link: string, name: string, size: number }> {
  return await new Promise((resolve, reject) => {
    const name = Buffer.from(file.originalname, 'ascii').toString('utf8')
    const blob = bucket.file(`${email}/${id}/${name}`)
    const blobStream = blob.createWriteStream({ resumable: false })
    const size = file.size / 1024 / 1024

    blobStream
      .on('finish', async () => {
        await bucket.file(`${email}/${id}/${name}`).makePublic()
        const link = `https://storage.googleapis.com/${bucket.name}/${email}/${id}/${name}`
        resolve({ link, name, size })
      })
      .on('error', (error) => {
        console.error(error)
        reject(new Error('Unable to upload file, something went wrong'))
      })
      .end(file.buffer)
  })
}
