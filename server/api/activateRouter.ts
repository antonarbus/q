// activateRouter
import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export const activateRouter = express.Router()
activateRouter.get('/:link', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    const activationLink = `${domain}:${port}/api/activate/${req.params.link}`
    const user = await UserModel.findOne({ activationLink })
    if (!user) return res.json({ status: 'error', message: 'no account with such activation link' })
    user.isActivated = true
    await user.save()
    return res.redirect(`${domain}:${port}/login`)
  } catch (error: any) {
    next(error)
  }
})
