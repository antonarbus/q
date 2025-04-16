import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type ReqBody = {
  fileName: string
}

export type ResBody = {
  link: string | null
  message:
    | ErrorMessageCommon
    | 'invalid file name'
    | 'made file public'
    | 'failed to make file public'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const makeFilePublic: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { fileName } = req.body

  if (!fileName || typeof fileName !== 'string') {
    res
      .status(httpStatus.badRequest_400)
      .json({ message: 'invalid file name', link: null })

    return
  }

  try {
    const filePath = getFilePath({ email, fileType: 'file', fileName })
    await bucket.file(filePath).makePublic()
    const publicUrl = `${fileBaseUrl}/${filePath}`
    // save filename and filesize in db

    res
      .status(httpStatus.success_200)
      .json({ message: 'made file public', link: publicUrl })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to make file public',
      link: null,
    })
  }
}
