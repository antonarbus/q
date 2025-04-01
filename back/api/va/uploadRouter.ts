import { Router, type Request, type Response, type NextFunction } from 'express'
import multer from 'multer'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromRefreshToken } from '@back/entities/user'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

type Props = {
  file: Express.Multer.File
  email: string
}

type Res = Promise<{
  link: string
  name: string
  size: number
}>

// todo: not in use, moved upload to client side
async function uploadFileIntoMemory({ file, email }: Props): Res {
  const fileName = Buffer.from(file.originalname, 'ascii').toString('utf8')
  const filePath = getFilePath({ email, fileType: 'file', fileName })
  const blob = bucket.file(filePath)
  const blobStream = blob.createWriteStream({ resumable: false })
  const size = file.size / 1024 / 1024

  const fileInfo: Res = new Promise((resolve, reject) => {
    const makeFilePublic = async (): Promise<void> => {
      await bucket.file(filePath).makePublic()
      const link = `${fileBaseUrl}/${filePath}`
      resolve({ link, name: fileName, size })
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

  return fileInfo
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
}

uploadRouter.post(
  '/',
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
  }).single('file'), // middleware processes single file uploads, where 'file' is the name of the file input field. The file's details will be stored in req.file
  asyncHandler(upload),
)
