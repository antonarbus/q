import { z } from 'zod'

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
  email: z.string(),
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  info: z.string(),
  preview: z.string(),
  width: z.number(),
  height: z.number(),
  isFroala: z.boolean(),
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

const blockItemSchema = z.discriminatedUnion('type', [
  boqBlockSchema,
  textBlockSchema,
  priceBlockSchema,
  rowBlockSchema,
])

export const quotationSchema = z.object({
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

export type Quotation = z.infer<typeof quotationSchema>
