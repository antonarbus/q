import {
  boqBlockSchema,
  textBlockSchema,
  priceBlockSchema,
  rowBlockSchema,
  boqBlockInBucketSchema,
  textBlockInBucketSchema,
  priceBlockInBucketSchema,
  rowBlockInBucketSchema,
} from '@back/entities/quotation/quotationSchema'
import { z } from 'zod'

// Bucket data schema for bookmarks (excludes pasteBlock since bookmarks don't use it)
export const bookmarkBucketDataSchema = z.discriminatedUnion('type', [
  boqBlockInBucketSchema,
  textBlockInBucketSchema,
  priceBlockInBucketSchema,
  rowBlockInBucketSchema,
])

// Full bookmark schema (with metadata) - excludes pasteBlock
export const bookmarkSchema = z.discriminatedUnion('type', [
  boqBlockSchema,
  textBlockSchema,
  priceBlockSchema,
  rowBlockSchema,
])

export type Bookmark = z.infer<typeof bookmarkSchema>
