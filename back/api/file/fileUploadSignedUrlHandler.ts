import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@back/shared/lib/nanoid'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  signedUrl: string
  url: string
  fileId: string
}

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'SIGNED_URL_GENERATION_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const fileUploadSignedUrlHandler: RouterHandler = async (req, res) => {
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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'SIGNED_URL_GENERATION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to generate signed URL for file upload',
    })
  }
}
