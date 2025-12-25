import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@back/shared/lib/nanoid'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  signedUrl: string
  url: string
  fileId: string
}

type ErrorResBody = {
  message: ErrorMessageCommon | 'failed to generate signed url'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const fileUploadSignedUrlHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  getUserFromAccessTokenOrThrowUnauthorized({ req, res })

  const fileId = generateId()
  const fileInfo = getFileInfo({ id: fileId })
  const file = bucket.file(fileInfo.path)

  try {
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes expiration
      extensionHeaders: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
    })

    res.status(httpStatusCode.success200).json({
      signedUrl,
      url: fileInfo.url,
      fileId,
    })
  } catch {
    res.status(httpStatusCode.serverError500).json({
      message: 'failed to generate signed url',
    })
  }
}
