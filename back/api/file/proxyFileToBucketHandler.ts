import { FileModel } from '@back/entities/file'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

type Params = {
  fileId: string
}

export type ResBody = string

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
  next,
) => {
  // const user = getUserFromAccessTokenOrNull({ req })
  const { fileId } = req.params

  const cached = signedUrlCache.get(fileId)

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

  const fileInfo = await FileModel.findOne({ id: fileId })
    .select({ _id: 0, id: 1, name: 1, size: 1 })
    .lean()

  if (fileInfo === null) {
    res.status(httpStatus.notFound_404).send('File not found')

    return
  }

  try {
    const { path } = getFileInfo({ id: fileId })
    const file = bucket.file(path) // Get reference to the file in the bucket

    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + SIGNED_URL_TTL_MS,
      responseDisposition: `inline; filename="${fileInfo.name}"`, // display in browser
      // responseDisposition: `attachment; filename="${fileMeta.originalName}"`, // force to download
    })

    await file.setMetadata({ cacheControl: 'public, max-age=300' })

    signedUrlCache.set(fileId, {
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
    res.status(httpStatus.serverError_500).send('Failed to generate file link')
  }
}
