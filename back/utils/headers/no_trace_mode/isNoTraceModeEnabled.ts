import type { Request } from 'express'
import { cookieName } from '../const'

export const isNoTraceModeEnabled = (req: Request<unknown>): boolean => {
  type ReqWithCookies = {
    cookies?: {
      [cookieName.noTraceMode]?: boolean
    }
  }

  const noTraceMode = (req as ReqWithCookies).cookies?.[cookieName.noTraceMode]

  if (noTraceMode === undefined) {
    return false
  }

  return noTraceMode
}
