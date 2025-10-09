import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@back/shared/lib/nanoid'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'

export type SearchQuery = {
  fileName: string
}

export type ResBody = {
  signedUrl: string | null
  url: string | null
  fileId: string
  message: 'signed url generated'
}

export type ErrorResBody = {
  signedUrl: string | null
  url: string | null
  fileId: string
  message: ErrorMessageCommon | 'failed to generate signed url'
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const fileUploadSignedUrlHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  getUserFromAccessTokenOrThrowUnauthorized({ req, res })

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
