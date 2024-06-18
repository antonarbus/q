import express from 'express'
import multer from 'multer'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { bucket, storageFolderName } from '../../services/storage'
import type { Next, Req, ResWithBody } from '../../types'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '../../utils/getEmailFromRefreshTokenOrThrowUnauthorized'

export type ResBody = {
  message: ErrorMessageCommon | 'not uploaded' | 'no file' | 'uploaded'
  link?: string
  name?: string
  size?: number
}

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const uploadRouter = express.Router()

const upload: RouterHandler = async (req, res, next) => {
  try {
    const { file } = req

    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    if (file === undefined) {
      return res.status(httpStatus.badRequest_400).json({ message: 'no file' })
    }

    const { name, link, size } = await uploadFileIntoMemory({ file, email })

    if (link) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'uploaded', link, name, size })
    }

    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'not uploaded' })
  } catch (error) {
    next(error)
  }
}

uploadRouter.post(
  '/',
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
  }).single('file'), // middleware processes single file uploads, where 'file' is the name of the file input field. The file's details will be stored in req.file
  // verifyTokenMiddleware, // todo: do not know how to use axios instance with froala file update, so let's validate token manually
  upload,
)

// https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876

type Props = {
  file: Express.Multer.File
  email: string
}

type Res = Promise<{
  link: string
  name: string
  size: number
}>

async function uploadFileIntoMemory({ file, email }: Props): Res {
  const name = Buffer.from(file.originalname, 'ascii').toString('utf8')
  const filePath = `${email}/${storageFolderName.files}/${name}`
  const blob = bucket.file(filePath)
  const blobStream = blob.createWriteStream({ resumable: false })
  const size = file.size / 1024 / 1024

  return await new Promise((resolve, reject) => {
    blobStream
      .on('finish', async () => {
        await bucket.file(filePath).makePublic()
        const link = `https://storage.googleapis.com/${bucket.name}/${filePath}`
        resolve({ link, name, size })
      })
      .on('error', (error) => {
        console.error(error)
        reject(new Error('Unable to upload file, something went wrong'))
      })
      .end(file.buffer)
  })
}
