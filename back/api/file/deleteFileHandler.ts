import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type ReqBody = {
  fileName: string
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'deleted'
    | 'failed to delete'
    | 'invalid file name'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteFileHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { fileName } = req.body

  if (!fileName || typeof fileName !== 'string') {
    res.status(httpStatus.badRequest_400).json({ message: 'invalid file name' })

    return
  }

  const filePath = getFilePath({ email, fileType: 'file', fileName })

  try {
    await bucket.file(filePath).delete()

    // todo: go though all quotations and change files array + carve file out from the quotation json file, replace with FILE WAS DELETED link
  } catch {
    res.status(httpStatus.notFound_404).json({ message: 'failed to delete' })
  }

  res.status(httpStatus.success_200).json({ message: 'deleted' })
}
