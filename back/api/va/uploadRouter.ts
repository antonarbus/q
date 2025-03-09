import { Router, type Request, type Response, type NextFunction } from 'express'
import multer from 'multer'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, storageFolderName } from '@back/shared/services/storage'
import { getUserFromRefreshToken } from '@back/entities/user'

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

  return new Promise((resolve, reject) => {
    const makeFilePublic = async (): Promise<void> => {
      await bucket.file(filePath).makePublic()
      const link = `https://storage.googleapis.com/${bucket.name}/${filePath}`
      resolve({ link, name, size })
    }

    blobStream
      .on('finish', () => {
        void makeFilePublic()
      })
      .on('error', (error) => {
        console.error(error)
        reject(new Error('Unable to upload file, something went wrong'))
      })
      .end(file.buffer)
  })
}

type ResBody = {
  message: ErrorMessageCommon | 'not uploaded' | 'no file' | 'uploaded'
  link?: string
  name?: string
  size?: number
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const uploadRouter = Router()

const upload: RouterHandler = async (req, res, next) => {
  try {
    const { file } = req

    const { email } = getUserFromRefreshToken({ req })

    if (file === undefined) {
      res.status(httpStatus.badRequest_400).json({ message: 'no file' })

      return
    }

    const { name, link, size } = await uploadFileIntoMemory({ file, email })

    if (link) {
      res
        .status(httpStatus.success_200)
        .json({ message: 'uploaded', link, name, size })

      return
    }

    res.status(httpStatus.serverError_500).json({ message: 'not uploaded' })
  } catch (error) {
    next(error)
  }
}

uploadRouter.post(
  '/',
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
  }).single('file'), // middleware processes single file uploads, where 'file' is the name of the file input field. The file's details will be stored in req.file
  upload,
)
