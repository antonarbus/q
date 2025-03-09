import type { Response } from 'express'
import { cookieName } from '../const'

type Props = {
  res: Response
}

export const removeNoTraceCookie = ({ res }: Props): void => {
  res.clearCookie(cookieName.noTrace)
}
