import type {
  BoqBlock,
  TextBlock,
  PriceBlock,
  RowBlock,
} from '@entities/quotation/types/BlockItem'

export type Bookmark = BoqBlock | TextBlock | PriceBlock | RowBlock
