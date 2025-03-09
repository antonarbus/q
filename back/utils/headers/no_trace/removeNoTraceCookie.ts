import type { Response } from 'express'
import { cookieName } from '../const'

export const removeNoTraceCookie = (res: Response): void => {
  res.clearCookie(cookieName.noTrace)
}
