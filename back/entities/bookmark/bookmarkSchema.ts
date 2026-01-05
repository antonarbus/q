import type { z } from 'zod'
import { quotationSchema } from '@back/entities/quotation/quotationSchema'

export const bookmarkSchema = quotationSchema.shape.blocks.element
export type Bookmark = z.infer<typeof bookmarkSchema>
