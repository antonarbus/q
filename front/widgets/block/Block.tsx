import { itemType } from '@entities/quotation/const/itemType'
import { BlockProvider } from '@entities/quotation/provider/BlockProvider'
import type { Item } from '@entities/quotation/type'
import type { ReactNode } from 'react'
import { BookmarkedRowBlock } from './bookmarked-row-block'
import { BoqBlock } from './boq-block/BoqBlock'
import { PasteItemBlock } from './paste-block'
import { PriceBlock } from './price-block'
import { TextBlock } from './text-block'

type Props = {
  block: Item
  blockIndex: number
}

export const Block = ({ block, blockIndex }: Props): ReactNode => {
  return (
    <BlockProvider item={block} index={blockIndex}>
      {block.type === itemType.text && <TextBlock />}
      {block.type === itemType.boq && <BoqBlock />}
      {block.type === itemType.price && <PriceBlock />}
      {block.type === itemType.row && <BookmarkedRowBlock />}
      {block.type === itemType.paste && <PasteItemBlock />}
    </BlockProvider>
  )
}
