import {
  filesTable,
  type SelectFile,
} from '@back/entity/file/db/filesTableSchema'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParsedQs } from 'qs'
import {
  httpRedirect,
  type HttpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs

type UrlParam = {
  fileId: SelectFile['id']
}

type ReqBody = undefined
type ResBody = string

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FILE_NOT_FOUND' | 'SIGNED_URL_GENERATION_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

const signedUrlCache = new Map<string, { url: string; expiresAt: number }>()

const SIGNED_URL_TTL_MS = 5 * 60 * 1000 // 5 minutes
const CLIENT_CACHE_MAX_AGE = SIGNED_URL_TTL_MS / 1000 // 5 min in seconds

export const proxyFileToBucketHandler: RouterHandler = async (req, res) => {
  const messageList: string[] = []

  const cached = signedUrlCache.get(req.params.fileId)

  const cacheIsNotExpired =
    cached !== undefined && cached.expiresAt > Date.now()

  if (cacheIsNotExpired === true) {
    messageList.push('Serving cached signed URL')

    res.set(
      'Cache-Control',
      `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`,
    )

    return httpRedirect({
      statusCode: httpStatusCode.reDirect302,
      redirectUrl: cached.url,
    })
  }

  const [fileSelected] = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.id, req.params.fileId))

  if (fileSelected === undefined) {
    messageList.push('File not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push('File found in database')

  try {
    const fileInfo = getFileInfo({ id: req.params.fileId })
    const file = bucket.file(fileInfo.path) // Get reference to the file in the bucket

    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + SIGNED_URL_TTL_MS,
      responseDisposition: `inline; filename="${fileSelected.name}"`, // display in browser
      // responseDisposition: `attachment; filename="${fileMeta.originalName}"`, // force to download
    })

    await file.setMetadata({ cacheControl: 'public, max-age=300' })

    signedUrlCache.set(req.params.fileId, {
      url: signedUrl,
      expiresAt: Date.now() + SIGNED_URL_TTL_MS, // should be slightly less, but let it be like this for now
    })

    messageList.push('Generated new signed URL and cached it')

    res.set(
      'Cache-Control',
      `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`,
    )

    return httpRedirect({
      statusCode: httpStatusCode.reDirect302,
      redirectUrl: signedUrl,
    })
  } catch (error) {
    console.error('Error generating signed URL:', error)

    messageList.push('Failed to generate signed URL')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'SIGNED_URL_GENERATION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }
}
