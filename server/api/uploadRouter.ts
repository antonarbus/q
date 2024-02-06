import crypto from 'node:crypto'
import path from 'node:path'
import { format } from 'node:util'
import { Storage } from '@google-cloud/storage'
import express from 'express'
// import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Res, Req } from '../types'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

const bucket = storage.bucket('quotation-app-bucket')

export const uploadRouter = express.Router()

const upload = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    if (req.file === undefined) return

    // const uploadedFile = await uploadFileIntoMemory(req.file) // upload file
    const { fileName, link } = await uploadFileIntoMemory(req.file) // upload file
    await bucket.file(fileName).makePublic() // make file public

    const fileInfo = {
      link,
      origName: req.file.originalname,
      size: req.file.size / 1024 / 1024,
      date: new Date(),
    }
    // ACTION: send fileInfo into user's DB

    res.status(200).json({ link })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

uploadRouter.post(
  '/',
  // verifyTokenMiddleware,
  upload,
)

// https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876

async function uploadFileIntoMemory(file: Express.Multer.File): Promise<{ link: string, fileName: string }> {
  return await new Promise((resolve, reject) => {
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex')
    const fileExt = path.extname(file.originalname) // fileExt constrains '.' // .doc
    const finalFileName = fileHash + fileExt

    const blob = bucket.file(finalFileName)
    const blobStream = blob.createWriteStream({ resumable: false })

    blobStream
      .on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${finalFileName}`)

        resolve({
          link: publicUrl,
          fileName: finalFileName,
        })
      })
      .on('error', (error) => {
        console.error(error)
        reject(new Error('Unable to upload file, something went wrong'))
      })
      .end(file.buffer)
  })
}
