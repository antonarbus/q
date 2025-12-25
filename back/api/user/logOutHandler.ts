import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = unknown

export type ResBody = {
  message: 'logged out'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const logOutHandler: RouterHandler = (_req, res, _next) => {
  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatusCode.success200).json({ message: 'logged out' })
}
