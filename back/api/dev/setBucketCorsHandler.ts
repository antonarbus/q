import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { secret } from '@root/config/secrets'
import { DOMAIN } from '@root/config/infrastructure'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, unknown, SearchQuery>,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const setBucketCorsHandler: RouterHandler = async (req, res, _next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: 'Forbidden - super admin access required',
    })
  }

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

  console.info(`Bucket ${secret.BUCKET_NAME} CORS were updated`)

  res.json(corsUpdateRes.at(0)?.cors)
}
