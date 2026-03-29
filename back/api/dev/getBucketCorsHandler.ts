import { getUserFromRefreshTokenOrUnknownPerson } from '@back/entity/user/getUserFromRefreshTokenOrUnknownPerson'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { getBucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { type HttpResponse, httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import { log } from '@back/shared/util/log'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined
type ResBody = unknown

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getBucketCorsHandler: RouterHandler = async (req) => {
  const userFromRefreshToken = await getUserFromRefreshTokenOrUnknownPerson({
    req,
  })

  if (userFromRefreshToken.roles.includes('super-admin') === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: 'Forbidden - super admin access required',
    })
  }

  const bucket = await getBucket()

  const [metadata] = await bucket.getMetadata()
  log.info(JSON.stringify(metadata, null, 2))

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: metadata.cors,
  })
}
