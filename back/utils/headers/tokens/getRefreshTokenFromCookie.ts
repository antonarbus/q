import type { Request } from 'express'
import { cookieName } from '../const'

type Props = {
  req: Request
}

type Cookies = {
  [cookieName.refreshJwtToken]?: string
}

export const getRefreshTokenFromCookie = ({
  req,
}: Props): string | undefined => {
  const refreshJwtToken = (req.cookies as Cookies)[cookieName.refreshJwtToken]

  return refreshJwtToken
}
