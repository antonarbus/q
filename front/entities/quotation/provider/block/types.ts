import type { BlockItem } from '@back/entity/quotation/schema'

export type Res = {
  index: number
  item: BlockItem
}

export type Props = Res & {
  children: React.ReactNode
}
