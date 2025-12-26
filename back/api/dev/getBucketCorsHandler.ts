import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined
type ResBody = unknown

type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBucketCorsHandler: RouterHandler = async (req, res) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: 'Forbidden - super admin access required',
    })
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}
