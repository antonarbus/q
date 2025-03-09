import type { Request } from 'express'
import { cookieName } from '../const'

type RequestWithCookies = Request<unknown> & {
  cookies: {
    [cookieName.noTrace]?: boolean
  }
}

type Props = {
  req: RequestWithCookies
}

export const isNoTraceCookie = ({ req }: Props): boolean => {
  const noTraceMode = req.cookies[cookieName.noTrace]

  if (noTraceMode === undefined) {
    return false
  }

  return noTraceMode
}
