import type { Response } from 'express'
import { runtimeConfig } from '@root/config/runtime'
import { cookieName } from '../const/cookieName'

type Props = {
  res: Response
}

/**
 * If super-admin logs into someone user's account we
 * do not want to log timestamp of sign-in, open
 * quotation or bookmark.
 *
 * We set the 'no-trace': true cookie to the header
 */
export const setNoTraceMode = (props: Props): void => {
  props.res.cookie(cookieName.noTrace, true, {
    httpOnly: true,
    secure: runtimeConfig.nodeEnv === 'production',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms,
  })
}
