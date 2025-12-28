import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { generateId } from '@root/shared/lib/nanoid'
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
  message: string
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

  const messageList: string[] = []

  const fileId = generateId()
  const fileInfo = getFileInfo({ id: fileId })
  const file = bucket.file(fileInfo.path)

  messageList.push('Generated new file ID')

  try {
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes expiration
      extensionHeaders: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
    })

    messageList.push('Generated signed URL for file upload')

    res.status(httpStatusCode.success200).json({
      signedUrl,
      url: fileInfo.url,
      fileId,
      message: messageList.join(' | '),
    })
  } catch {
    messageList.push('Failed to generate signed URL')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'SIGNED_URL_GENERATION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }
}
