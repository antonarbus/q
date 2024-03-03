import { headerName } from '../consts/headerName'
import { verifyAccessToken, type JwtPayloadExtended } from '../services/jwt'
import type { Next, Req, Res } from '../types'

export const verifyTokenMiddleware = (req: Req, res: Res, next: Next): Res | undefined => {
  try {
    const accessJwtToken = req.headers[headerName.accessJwtToken]

    if (typeof accessJwtToken !== 'string') {
      return res
        .status(401)
        .json({ message: 'something happened during jwt token validation' })
    }

    const { email } = verifyAccessToken(accessJwtToken) as JwtPayloadExtended

    if (typeof email !== 'string') {
      return res
        .status(401)
        .json({ message: 'accessJwtToken is not verified, user is not authorized' })
    }

    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'accessJwtToken is not verified, user is not authorized' })
  }
}
