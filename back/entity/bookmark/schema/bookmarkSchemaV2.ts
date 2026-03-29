import type { z } from 'zod'
//* V2
import { quotationSchema } from '@back/entity/quotation/schema/quotationSchemaV2'

export const bookmarkSchema = quotationSchema.shape.blocks.element
export type Bookmark = z.infer<typeof bookmarkSchema>
