import type { Request } from 'express'
import { cookieName } from '../const/cookieName'

type RequestWithCookies = Request<unknown> & {
  cookies: {
    [cookieName.refreshJwtToken]?: string
  }
}

type Props = {
  req: RequestWithCookies
}

export const getRefreshTokenFromCookie = ({
  req,
}: Props): string | undefined => {
  const refreshJwtToken = req.cookies[cookieName.refreshJwtToken]

  return refreshJwtToken
}
