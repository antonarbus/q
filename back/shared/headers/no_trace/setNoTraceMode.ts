import type { Response } from 'express'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
}

/**
 * If super-admin logs into someone user's account we
 * do not want to log timestamp of sign-in, open
 * quotation or bookmark.
 *
 * We set the 'no-trace-mode': true cookie to the header
 */
export const setNoTraceMode = ({ res }: Props): void => {
  res.cookie(cookieName.noTrace, true, {
    httpOnly: true,
    secure: process.env.INSTALLATION !== 'local',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms,
  })
}
