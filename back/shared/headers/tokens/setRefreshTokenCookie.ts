import type { Response } from 'express'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
  refreshJwtToken: string
}

export const setRefreshTokenCookie = (props: Props): void => {
  const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000

  props.res.cookie(cookieName.refreshJwtToken, props.refreshJwtToken, {
    httpOnly: true,
    secure: process.env.INSTALLATION !== 'local',
    maxAge: threeMonthsInMs,
  })
}
