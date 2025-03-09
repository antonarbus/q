import { threeMonthsInSec } from '@back/utils/jwt'
import type { Response } from 'express'
import { cookieName } from '../const'

type Props = {
  res: Response
  refreshJwtToken: string
}

export const setRefreshTokenCookie = (props: Props): void => {
  props.res.cookie(cookieName.refreshJwtToken, props.refreshJwtToken, {
    httpOnly: true,
    secure: process.env.INSTALLATION !== 'local',
    maxAge: threeMonthsInSec * 1000,
  })
}
