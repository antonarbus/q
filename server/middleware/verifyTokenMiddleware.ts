import { headerName } from '../consts/headerName'
import { verifyAccessToken, type JwtPayloadExtended } from '../services/jwt'
import type { Next, Req, Res } from '../types'

export const verifyTokenMiddleware = (req: Req, res: Res, next: Next): Res | undefined => {
  try {
    const accessJwtToken = req.headers[headerName.accessJwtToken]

    if (typeof accessJwtToken !== 'string') {
      return res
        .status(401)
        .send('something happened during jwt token validation')
    }

    const { email } = verifyAccessToken(accessJwtToken) as JwtPayloadExtended

    if (typeof email !== 'string') {
      return res
        .status(401)
        .send('accessJwtToken is not verified, user is not authorized')
    }

    // req.body.email = email // can add email in header, maybe useful for something
    next()
  } catch (error) {
    return res
      .status(401)
      .send('accessJwtToken is not verified, user is not authorized')
  }
}
