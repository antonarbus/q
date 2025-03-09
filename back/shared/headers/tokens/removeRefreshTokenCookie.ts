import type { Response } from 'express'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
}

export const removeRefreshTokenCookie = ({ res }: Props): void => {
  res.clearCookie(cookieName.refreshJwtToken)
}
