import type { RowBlock } from '@back/entity/quotation/schema'

export type Props = {
  index: number
  item: RowBlock
  children: React.ReactNode
}

export type Res = Omit<Props, 'children'>
