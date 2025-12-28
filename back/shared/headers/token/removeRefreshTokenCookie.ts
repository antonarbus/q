import type { Response } from 'express'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
}

export const removeRefreshTokenCookie = (props: Props): void => {
  props.res.clearCookie(cookieName.refreshJwtToken)
}
