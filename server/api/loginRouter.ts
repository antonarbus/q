import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { getAccessJwtToken, getRefreshJwtToken, refreshJwtTokenExpirationSeconds } from '../services/jwt/jwt'

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get mail & password from body
    let { email, password } = req.body
    email = email.toLowerCase()

    // check email & password
    const user = await UserModel.findOne({ email })
    const isPasswordValid = user && await bcrypt.compare(password, user.password)
    if (!user || !isPasswordValid) return res.json({ status: 'error', message: 'invalid credentials' })

    // check if account is activated
    if (!user.isActivated) return res.json({ status: 'error', message: 'account is not activated' })

    // generate jwt tokens
    // const refreshJwtTokenExpirationDays = 30
    // const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })
    const accessJwtToken = getAccessJwtToken({ email })
    // const refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshJwtTokenExpirationDays}d` })
    const refreshJwtToken = getRefreshJwtToken({ email })

    // put refresh token in cookie
    res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationSeconds * 1000, httpOnly: true })

    // put refresh token in db (also update login date)
    const filter = { email }
    const update = { loggedAt: new Date(), refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)

    // return access token to the client
    res.json({ status: 'ok', message: `user with email: ${email} logged in`, accessJwtToken })
  } catch (error: any) {
    next(error)
  }
})

/*
  Authorization - checking if password is correct
  Authentication - checking if the user is the same as authorized initially

  (A) The client is authorized when logging in by comparing email and
      password against database.

  (B) On successful authorization the server issues an 'access'
      and a 'refresh' tokens for future authentication to avoid
      providing credentials on every http request.

  (C) Client stores 'access' token in the local storage and
      attaches it inside request headers for private api requests.
      Token is attached by 'request' interceptor in 'axiosWithAuth'

  (D) For protected api 'verifyToken' middleware verifies the token.
      If a token is ok, the request goes forward. If a token is bad
      (compromised or outdated) a response with status(401) is returned.

  (E) 'Access' token is short and expires in 15 min.
      'Response' interceptor in 'axiosWithAuth' checks for 401 status and
      tries to update 'access' token by presenting a 'refresh' token,
      which has 30d expiry time.

  (F) 'Refresh' token is stored in secured cookies on the login
      and also kept in database. If 'refresh' token is valid and
      available in database, then refreshed 'access' and 'refresh'
      tokens are issued.

  (G) If 'refresh' token is invalid or old, then 'access' token is not
      issued, client is considered as unauthorized and new login
      is required.

  (H) If a user is deleted from the database, he is still authorized, until
      'access' token is expired (15 min).

  (I) Tokens are also checked and refreshed at the initial app
      load in useEffect() in main component mount. That's how we determine
      if a client logged in or out.

  (J) As tokens we use JWT tokens, which contain encrypted (not hashed)
      payload, validation time and a hash based on a secret keys, which are
      kept on server. Server can validate the token knowing the
      secrete keys.
*/
