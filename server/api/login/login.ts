import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import mongoose from 'mongoose'

const router = express.Router()

mongoose.connect('mongodb://xxx')

router.post('/', (req: ReqType, res: ResType) => {
  console.log(req.body)
  res.json(req.body)
})

export default router
