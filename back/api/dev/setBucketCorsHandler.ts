import { getUserFromRefreshTokenOrUnknownPerson } from '@back/entity/user/getUserFromRefreshTokenOrUnknownPerson'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { getBucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { storageConfig } from '@back/config/storage'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { type HttpResponse, httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import { DOMAIN } from '@root/config/domain'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

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

export const setBucketCorsHandler: RouterHandler = async (req) => {
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

  const corsUpdateRes = await bucket.setCorsConfiguration([
    {
      origin: [
        `https://${DOMAIN}`,
        `http://${DOMAIN}`,
        `https://*.${DOMAIN}`,
        `http://*.${DOMAIN}`,
        `http://local.${DOMAIN}:3000`, // pdf download does not work without port
        `https://local.${DOMAIN}:3000`, // pdf download does not work without port
        'http://localhost:3000', // pdf download does not work without port
        'https://localhost:3000', // pdf download does not work without port
        '*', // pdf download does not work without port
      ],
      method: ['PUT', 'POST', 'GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type', 'x-goog-content-length-range'],
    },
  ])

  console.info(`Bucket ${storageConfig.bucketName} CORS were updated`)

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: corsUpdateRes.at(0)?.cors,
  })
}
