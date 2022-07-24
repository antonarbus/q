import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'

const router = express.Router()

router.post('/', (req: ReqType, res: ResType) => {
  console.log(req.body)
  res.json(req.body)
})

export default router
