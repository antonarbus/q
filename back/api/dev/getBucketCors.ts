import express from 'express'
import { bucket } from '../../services/storage'
import type { Next, Req, Res } from '../../types'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/jwt'
import { httpStatus } from '@back/consts/httpStatus'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

async function getBucketMetadata(
  req: Req,
  res: Res,
  next: Next,
): Promise<void> {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized(req)

  if (!roles.includes('super-admin')) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}

export const getBucketCors = express.Router()

getBucketCors.get('/', (req, res, next) => {
  void getBucketMetadata(req, res, next)
})
