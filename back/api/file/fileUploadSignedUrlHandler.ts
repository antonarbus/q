import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type SearchQuery = {
  fileName: string
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'invalid file name'
    | 'failed to generate signed url'
    | 'signed url generated'
  signedUrl: string | null
  publicUrl: string | null
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
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { fileName } = req.query

  if (!fileName || typeof fileName !== 'string') {
    res
      .status(httpStatus.badRequest_400)
      .json({ message: 'invalid file name', publicUrl: null, signedUrl: null })

    return
  }

  const filePath = getFilePath({ email, fileType: 'file', fileName })

  // Get reference to the file in the bucket
  const file = bucket.file(filePath)

  try {
    // Generate signed URL for uploading
    const [signedUrl] = await file.getSignedUrl({
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
      version: 'v4',
      extensionHeaders: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
    })

    const publicUrl = `${fileBaseUrl}/${filePath}`

    res
      .status(httpStatus.success_200)
      .json({ message: 'signed url generated', signedUrl, publicUrl })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to generate signed url',
      signedUrl: null,
      publicUrl: null,
    })
  }
}
