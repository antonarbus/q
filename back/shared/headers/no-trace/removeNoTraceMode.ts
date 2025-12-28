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
 * We set the 'no-trace': true cookie to the header
 */
export const removeNoTraceMode = (props: Props): void => {
  props.res.clearCookie(cookieName.noTrace)
}
