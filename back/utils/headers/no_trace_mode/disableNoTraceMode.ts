import type { Response } from 'express'
import { cookieName } from '../const'

export const disableNoTraceMode = (res: Response): void => {
  res.clearCookie(cookieName.noTraceMode)
}
