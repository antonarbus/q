import { type Item, BlockProvider, itemType } from '@entities/quotation'
import { BoqBlock } from './boq/BoqBlock'
import { PasteItem } from './paste/PasteItem'
import { PriceBlock } from './price/PriceBlock'
import { TextBlock } from './text/TextBlock'
import { RowBlock } from './row/RowBlock'
import type { ReactNode } from 'react'

type Props = {
  block: Item
  blockIndex: number
}

export const Block = ({ block, blockIndex }: Props): ReactNode => {
  return (
    <BlockProvider
      block={block}
      blockIndex={blockIndex}
    >
      {block.type === itemType.text && <TextBlock />}
      {block.type === itemType.boq && <BoqBlock />}
      {block.type === itemType.price && <PriceBlock />}
      {block.type === itemType.row && <RowBlock /> /* for bookmark modal */}
      {block.type === itemType.paste && <PasteItem />}
    </BlockProvider>
  )
}
