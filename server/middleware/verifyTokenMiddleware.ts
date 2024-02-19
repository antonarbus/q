import { headerName } from '../consts/headerName'
import type { JwtPayloadExtended } from '../services/jwt'
import { token } from '../services/jwt'
import type { Next, ReqWithBody, Res } from '../types'

export const verifyTokenMiddleware = (req: ReqWithBody<{ email?: string }>, res: Res, next: Next): Res | undefined => {
  try {
    const accessJwtToken = req.headers[headerName.accessJwtToken]
    console.log('🚀 ~ req.headers:', req.headers)
    console.log('🚀 ~ accessJwtToken:', accessJwtToken)

    if (typeof accessJwtToken !== 'string') {
      return res
        .status(401)
        .send('something happened during jwt token validation')
    }

    const { email } = token.verify.access(accessJwtToken) as JwtPayloadExtended

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
