import type { Request } from 'express'
import { cookieName } from '../const/cookieName'

type RequestWithCookies = Request<unknown> & {
  cookies: {
    [cookieName.noTrace]?: true
  }
}

type Props = {
  req: RequestWithCookies
}

/**
 * If super-admin logs into someone user's account we
 * do not want to log timestamp of sign-in, open
 * quotation or bookmark.
 *
 * We set the 'no-trace': true cookie to the header
 */
export const getShouldNotTrace = (props: Props): boolean => {
  const noTraceCookie = props.req.cookies[cookieName.noTrace]

  if (noTraceCookie === undefined) {
    return false
  }

  return true
}
