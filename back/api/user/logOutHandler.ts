import { httpStatusCode } from '@back/shared/const/httpCode'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  message: 'logged out'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const logOutHandler: RouterHandler = (_req, res) => {
  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatusCode.success200).json({ message: 'logged out' })
}
