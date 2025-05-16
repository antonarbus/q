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

export const getShouldNotTrace = ({ req }: Props): boolean => {
  const noTraceCookie = req.cookies[cookieName.noTrace]

  if (noTraceCookie === undefined) {
    return false
  }

  return true
}
