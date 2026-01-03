import { z } from 'zod'

// Cell schemas
const cellPinSchema = z.object({
  isPinned: z.boolean(),
  isShown: z.boolean(),
})

export type CellPin = z.infer<typeof cellPinSchema>

const cellSchema = z.object({
  html: z.string(),
  value: z.number(),
  pin: cellPinSchema,
})

export type Cell = z.infer<typeof cellSchema>

const columnSchema = z.object({
  html: z.string(),
  width: z.number(),
})

export type Column = z.infer<typeof columnSchema>

const headerValueSchema = z.object({
  html: z.string(),
  value: z.number(),
})

export type HeaderValue = z.infer<typeof headerValueSchema>

const headerSchema = z.object({
  title: headerValueSchema,
  subtotalText: headerValueSchema,
  subTotalPrice: headerValueSchema,
})

type Header = z.infer<typeof headerSchema>

export type HeaderKey = keyof Header

// Base block metadata schema (from SelectBookmark)
const blockMetaDataSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Complete bucket data schemas for each block type
export const rowBlockInBucketSchema = z.object({
  info: z.string(),
  preview: z.string(),
  width: z.number(),
  height: z.number(),
  isFroala: z.boolean(),
  type: z.literal('row'),
  description: cellSchema,
  itemPrice: cellSchema,
  qty: cellSchema,
  price: cellSchema,
})

// Full block schemas (metadata + bucket data) - need to declare rowBlockSchema first for use in boqBlock
export const rowBlockSchema = blockMetaDataSchema.extend(
  rowBlockInBucketSchema.shape,
)

export type RowBlock = z.infer<typeof rowBlockSchema>

export const boqBlockInBucketSchema = z.object({
  info: z.string(),
  preview: z.string(),
  width: z.number(),
  height: z.number(),
  isFroala: z.boolean(),
  type: z.literal('boq'),
  boq: z.object({
    header: headerSchema,
    column: z.object({
      number: columnSchema,
      description: columnSchema,
      itemPrice: columnSchema,
      qty: columnSchema,
      price: columnSchema,
    }),
    rows: z.array(rowBlockSchema), // Full rows with metadata
  }),
})

export const textBlockInBucketSchema = z.object({
  info: z.string(),
  preview: z.string(),
  width: z.number(),
  height: z.number(),
  isFroala: z.boolean(),
  type: z.literal('text'),
  text: z.object({
    html: z.string(),
    value: z.null(),
  }),
})

export const priceBlockInBucketSchema = z.object({
  info: z.string(),
  preview: z.string(),
  width: z.number(),
  height: z.number(),
  isFroala: z.boolean(),
  type: z.literal('price'),
  title: z.object({
    html: z.string(),
    value: z.null(),
  }),
  price: z.object({
    html: z.string(),
    value: z.number(),
  }),
})

// Full block schemas (metadata + bucket data)
export const boqBlockSchema = blockMetaDataSchema.extend(
  boqBlockInBucketSchema.shape,
)

export type BoqBlock = z.infer<typeof boqBlockSchema>

export const textBlockSchema = blockMetaDataSchema.extend(
  textBlockInBucketSchema.shape,
)

export type TextBlock = z.infer<typeof textBlockSchema>

export const priceBlockSchema = blockMetaDataSchema.extend(
  priceBlockInBucketSchema.shape,
)

export type PriceBlock = z.infer<typeof priceBlockSchema>

// BlockItem discriminated union - FULL blocks with metadata (for app use)
const blockItemSchema = z.discriminatedUnion('type', [
  boqBlockSchema,
  textBlockSchema,
  priceBlockSchema,
  rowBlockSchema,
])

// Export FULL BlockItem type (with metadata) for app use
export type BlockItem = z.infer<typeof blockItemSchema>

// Metadata stored in DB
const quotationMetadataSchema = z.object({
  // From SelectQuotation (DB metadata)
  id: z.string(),
  email: z.string(),
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  openedAt: z.string().nullable(),
  viewedAt: z.string().nullable(),
  access: z.object({
    level: z.enum(['everyone', 'nobody', 'custom']),
    userList: z.array(z.string()),
  }),
})

// QuotationBucketData schema - ONLY quotation-level heavy data
// Blocks still contain their own metadata (id, email, name, etc.)
// Only quotation-level metadata is separated
export const quotationBucketDataSchema = z.object({
  info: z.string(),
  blocks: z.array(blockItemSchema), // Blocks WITH metadata
})

// Runtime valuated permission
const quotationPermissionSchema = z.object({
  permissionLevel: z.enum([
    'NEW',
    'OWNER',
    'PUBLIC',
    'SHARED',
    'SUPER_ADMIN',
    'SUPER_ADMIN_ON_BEHALF_OF_A_USER',
    'FORBIDDEN',
  ]),
})

// Complete quotation
export const quotationSchema = quotationMetadataSchema
  .extend(quotationBucketDataSchema.shape)
  .extend(quotationPermissionSchema.shape)

export type Quotation = z.infer<typeof quotationSchema>
