import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { removeNoTraceMode, removeRefreshTokenCookie } from '@back/shared/headers'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => HttpResponse<ResBody>

export const logOutHandler: RouterHandler = (_req, res) => {
  const messageList: string[] = []

  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })

  messageList.push('User logged out successfully')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
    },
  })
}
