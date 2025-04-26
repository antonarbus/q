import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { generateId } from '@back/shared/lib/nanoid'

export type SearchQuery = {
  fileName: string
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'failed to generate signed url'
    | 'signed url generated'
  signedUrl: string | null
  publicUrl: string | null
  fileId: string
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const fileUploadSignedUrlHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  getUserFromAccessTokenOrThrowUnauthorized({ req })

  const fileId = generateId()
  const filePath = getFilePath({ fileType: 'file', fileId })
  const file = bucket.file(filePath) // Get reference to the file in the bucket

  try {
    const [signedUrl] = await file.getSignedUrl({
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
      version: 'v4',
      extensionHeaders: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
    })

    const publicUrl = `${fileBaseUrl}/${filePath}`

    res
      .status(httpStatus.success_200)
      .json({ message: 'signed url generated', signedUrl, publicUrl, fileId })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to generate signed url',
      signedUrl: null,
      publicUrl: null,
      fileId: '',
    })
  }
}
