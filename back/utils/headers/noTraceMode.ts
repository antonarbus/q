import type { Response, Request } from 'express'

const COOKIE_NAME = 'no-trace-mode'

/**
 * If super-admin logs into someone user's account we
 * do not want to log timestamp of logging in, open
 * quotation or bookmark
 *
 * We set the 'no-trace-mode': true cookie to header
 */
export const enableNoTraceMode = (res: Response): void => {
  res.cookie(COOKIE_NAME, true, {
    httpOnly: true,
    secure: process.env.INSTALLATION !== 'local',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms,
  })
}

export const disableNoTraceMode = (res: Response): void => {
  res.clearCookie(COOKIE_NAME)
}

export const isNoTraceModeEnabled = (req: Request<unknown>): boolean => {
  type ReqWithCookies = {
    cookies?: {
      [COOKIE_NAME]?: boolean
    }
  }

  const noTraceMode = (req as ReqWithCookies).cookies?.[COOKIE_NAME]

  if (noTraceMode === undefined) {
    return false
  }

  return noTraceMode
}
