import { BlockProvider, type Item, itemType } from '@entities/quotation'
import type { ReactNode } from 'react'
import { BoqBlock } from './boq/BoqBlock'
import { PasteItem } from './paste/PasteItem'
import { PriceBlock } from './price/PriceBlock'
import { RowBlock } from './row/RowBlock'
import { TextBlock } from './text/TextBlock'

type Props = {
  block: Item
  blockIndex: number
}

export const Block = ({ block, blockIndex }: Props): ReactNode => {
  return (
    <BlockProvider block={block} blockIndex={blockIndex}>
      {block.type === itemType.text && <TextBlock />}
      {block.type === itemType.boq && <BoqBlock />}
      {block.type === itemType.price && <PriceBlock />}
      {block.type === itemType.row && <RowBlock /> /* for bookmark modal */}
      {block.type === itemType.paste && <PasteItem />}
    </BlockProvider>
  )
}
