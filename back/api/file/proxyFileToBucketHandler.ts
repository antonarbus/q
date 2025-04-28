import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFileInfo } from '@back/shared/services/storage'
import { FileModel } from '@back/entities/file'

export type ResBody = string

type Params = {
  fileId: string
}

type RouterHandler = (
  req: Request<Params>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const proxyFileToBucketHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  // const user = getUserFromAccessTokenOrNull({ req })
  const { fileId } = req.params

  const fileInfo = await FileModel.findOne({ id: fileId })
    .select({ _id: 0, id: 1, name: 1, size: 1 })
    .lean()

  if (fileInfo === null) {
    res.status(httpStatus.notFound_404).send('File not found')

    return
  }

  try {
    const { path } = getFileInfo({ id: fileId })

    const [signedUrl] = await bucket.file(path).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      responseDisposition: `inline; filename="${fileInfo.name}"`, // display in browser
      // responseDisposition: `attachment; filename="${fileMeta.originalName}"`, // force to download
    })

    res.redirect(signedUrl)
  } catch (error) {
    console.error('Error generating signed URL:', error)
    res.status(httpStatus.serverError_500).send('Failed to generate file link')
  }
}
