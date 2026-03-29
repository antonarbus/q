import { filesTable, type SelectFile } from '@back/entity/file/db/filesTableSchema'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { getBucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { runtimeConfig } from '@root/config/runtime'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParsedQs } from 'qs'
import { httpRedirect, type HttpResponse } from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs

type UrlParam = {
  id: SelectFile['id']
}

type ReqBody = undefined
type ResBody = string

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FILE_NOT_FOUND' | 'FILE_SIGNED_URL_GENERATION_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

const signedUrlCache = new Map<string, { url: string; expiresAt: number }>()

// 5 minutes
const SIGNED_URL_TTL_MS = 5 * 60 * 1000
// 5 min in seconds
const CLIENT_CACHE_MAX_AGE = SIGNED_URL_TTL_MS / 1000

export const proxyFileToBucketHandler: RouterHandler = async (req, res) => {
  const messageList: string[] = []

  const cached = signedUrlCache.get(req.params.id)

  const cacheIsNotExpired = cached !== undefined && cached.expiresAt > Date.now()

  if (cacheIsNotExpired === true) {
    messageList.push('Serving cached signed URL')

    res.set('Cache-Control', `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`)

    return httpRedirect({
      statusCode: httpStatusCode.reDirect302,
      redirectUrl: cached.url,
    })
  }

  const [fileSelected] = await db.select().from(filesTable).where(eq(filesTable.id, req.params.id))

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
    const bucket = await getBucket()
    const fileInfo = getFileInfo({ id: req.params.id })
    // Get reference to the file in the bucket
    const file = bucket.file(fileInfo.path)

    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + SIGNED_URL_TTL_MS,
      // display in browser
      responseDisposition: `inline; filename="${fileSelected.name}"`,
      // responseDisposition: `attachment; filename="${fileMeta.originalName}"`, // force to download
    })

    await file.setMetadata({
      cacheControl: 'public, max-age=300',
      metadata: {
        'entity-type': 'file',
        'uploaded-by': fileSelected.email,
        environment: runtimeConfig.environment,
      },
    })

    signedUrlCache.set(req.params.id, {
      url: signedUrl,
      // should be slightly less, but let it be like this for now
      expiresAt: Date.now() + SIGNED_URL_TTL_MS,
    })

    messageList.push('Generated new signed URL and cached it')

    res.set('Cache-Control', `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`)

    return httpRedirect({
      statusCode: httpStatusCode.reDirect302,
      redirectUrl: signedUrl,
    })
  } catch (error) {
    console.error('Error generating signed URL:', error)

    messageList.push('Failed to generate signed URL')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FILE_SIGNED_URL_GENERATION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }
}
