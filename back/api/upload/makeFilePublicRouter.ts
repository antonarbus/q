import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

export type SearchQuery = {
  fileName: string
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'invalid file name'
    | 'made file public'
    | 'failed to make file public'
  link: string | null
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const makeFilePublicRouter = Router()

const makeFilePublic: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { fileName } = req.query

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

makeFilePublicRouter.get('/', asyncHandler(makeFilePublic))
