import type { Request } from 'express'
import { cookieName } from '../const'

export const isNoTraceCookie = (req: Request<unknown>): boolean => {
  type ReqWithCookies = {
    cookies?: {
      [cookieName.noTrace]?: boolean
    }
  }

  const noTraceMode = (req as ReqWithCookies).cookies?.[cookieName.noTrace]

  if (noTraceMode === undefined) {
    return false
  }

  return noTraceMode
}
