import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const activateRouter = express.Router()
activateRouter.get('/:link', async (req: ReqType, res: ResType) => {
  try {
    await connectToDb()
    const activationLink = `${process.env.DOMAIN}/api/activate/${req.params.link}`
    console.log('req.params.link: ', req.params.link)
    console.log('req.params: ', req.params)
    console.log('activationLink: ', activationLink)
    const user = await UserModel.findOne({ activationLink })
    if (!user) return res.json({ status: 'error', message: 'no account with such activation link' })
    user.isActivated = true
    await user.save()
    return res.redirect(`${process.env.DOMAIN}/login`)
  } catch (error: any) {
    const { message, number, trace, name, ...rest } = error
    res.json({ status: 'error', message, number, trace, name, errorAsString: error.toString(), ...rest })
  }
})
