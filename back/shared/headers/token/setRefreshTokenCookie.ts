import type { Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
  refreshJwtToken: string
}

export const setRefreshTokenCookie = (props: Props): void => {
  const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000

  props.res.cookie(cookieName.refreshJwtToken, props.refreshJwtToken, {
    httpOnly: true,
    secure: runtimeConfig.nodeEnv === 'production',
    maxAge: threeMonthsInMs,
  })
}
