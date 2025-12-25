import { filesTable, type SelectFile } from '@back/entities/file'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

type Params = {
  fileId: SelectFile['id']
}

type ResBody = string

type RouterHandler = (
  req: Request<Params>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

const signedUrlCache = new Map<string, { url: string; expiresAt: number }>()

const SIGNED_URL_TTL_MS = 5 * 60 * 1000 // 5 minutes
const CLIENT_CACHE_MAX_AGE = SIGNED_URL_TTL_MS / 1000 // 5 min in seconds

export const proxyFileToBucketHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  // const user = getUserFromAccessTokenOrNull({ req })

  const cached = signedUrlCache.get(req.params.fileId)

  const cacheIsNotExpired =
    cached !== undefined && cached.expiresAt > Date.now()

  if (cacheIsNotExpired === true) {
    res.set(
      'Cache-Control',
      `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`,
    )

    res.redirect(cached.url)

    return
  }

  const [fileSelected] = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.id, req.params.fileId))

  if (fileSelected === undefined) {
    res.status(httpStatusCode.notFound404).send('File not found')

    return
  }

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

    res.set(
      'Cache-Control',
      `public, max-age=${CLIENT_CACHE_MAX_AGE}, immutable`,
    )

    res.redirect(signedUrl)
  } catch (error) {
    console.error('Error generating signed URL:', error)

    res
      .status(httpStatusCode.serverError500)
      .send('Failed to generate file link')
  }
}
