import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFileInfo } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { generateId } from '@back/shared/libs/nanoid'

export type SearchQuery = {
  fileName: string
}

export type ResBody = {
  signedUrl: string | null
  url: string | null
  fileId: string
  message:
    | ErrorMessageCommon
    | 'failed to generate signed url'
    | 'signed url generated'
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
  const { path, url } = getFileInfo({ id: fileId })
  const file = bucket.file(path)

  try {
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes expiration
      extensionHeaders: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
    })

    res.status(httpStatus.success_200).json({
      message: 'signed url generated',
      signedUrl,
      url,
      fileId,
    })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to generate signed url',
      signedUrl: null,
      url: null,
      fileId: '',
    })
  }
}
