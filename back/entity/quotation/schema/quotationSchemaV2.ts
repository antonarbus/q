import { z } from 'zod'

const CURRENT_QUOTATION_SCHEMA_VERSION = 2
const CURRENT_BOOKMARK_SCHEMA_VERSION = 2

// Schemas

const cellSchema = z.object({
  html: z.string(),
  value: z.number(),
  pin: z.object({
    isPinned: z.boolean(),
    isShown: z.boolean(),
  }),
})

const columnSchema = z.object({
  html: z.string(),
  width: z.number(),
})

const headerValueSchema = z.object({
  html: z.string(),
  value: z.number(),
})

const headerSchema = z.object({
  title: headerValueSchema,
  subtotalText: headerValueSchema,
  subTotalPrice: headerValueSchema,
})

const blockCommonSchema = z.object({
  id: z.string(),
  bookmarkSchemaVersion: z.literal(CURRENT_BOOKMARK_SCHEMA_VERSION),
  email: z.string(),
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  info: z.string(),
  width: z.number(),
  height: z.number(),
})

const rowBlockSchema = blockCommonSchema.extend({
  type: z.literal('row'),
  description: cellSchema,
  itemPrice: cellSchema,
  qty: cellSchema,
  price: cellSchema,
})

const boqBlockSchema = blockCommonSchema.extend({
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
    rows: z.array(rowBlockSchema),
  }),
})

const textBlockSchema = blockCommonSchema.extend({
  type: z.literal('text'),
  text: z.object({
    html: z.string(),
    value: z.null(),
  }),
})

const priceBlockSchema = blockCommonSchema.extend({
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

// Same as bookmark
const blockItemSchema = z.discriminatedUnion('type', [
  boqBlockSchema,
  textBlockSchema,
  priceBlockSchema,
  rowBlockSchema,
])

export const quotationSchema = z.object({
  quotationSchemaVersion: z.literal(CURRENT_QUOTATION_SCHEMA_VERSION),
  id: z.string(),
  type: z.literal('quotation'),
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
  info: z.string(),
  blocks: z.array(blockItemSchema),
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

// Types

export type Cell = z.infer<typeof cellSchema>
export type CellPin = z.infer<typeof cellSchema.shape.pin>
export type Column = z.infer<typeof columnSchema>
export type HeaderValue = z.infer<typeof headerValueSchema>
export type HeaderKey = keyof z.infer<typeof headerSchema>
export type BoqColumnKey = keyof z.infer<typeof boqBlockSchema.shape.boq.shape.column>
export type CellKey = Exclude<BoqColumnKey, 'number'>
export type RowBlock = z.infer<typeof rowBlockSchema>
export type BoqBlock = z.infer<typeof boqBlockSchema>
export type TextBlock = z.infer<typeof textBlockSchema>
export type PriceBlock = z.infer<typeof priceBlockSchema>
export type BlockItem = z.infer<typeof blockItemSchema>
export type Quotation = z.infer<typeof quotationSchema>
