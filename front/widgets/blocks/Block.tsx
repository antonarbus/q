import {
  type Block as BlockType,
  BlockProvider,
  itemType,
} from '@entities/quotation'
import { BoqBlock } from './boq/BoqBlock'
import { PasteItem } from './paste/PasteItem'
import { PriceBlock } from './price/PriceBlock'
import { TextBlock } from './text/TextBlock'
import { RowBlock } from './row/RowBlock'

type Props = {
  block: BlockType
  blockIndex: number
}

export const Block = ({ block, blockIndex }: Props): React.ReactNode => {
  return (
    <BlockProvider
      blockIndex={blockIndex}
      block={block}
    >
      {block.type === itemType.text && <TextBlock />}
      {block.type === itemType.boq && <BoqBlock />}
      {block.type === itemType.price && <PriceBlock />}
      {block.type === itemType.row && <RowBlock /> /* for bookmark modal */}
      {block.type === itemType.paste && <PasteItem />}
    </BlockProvider>
  )
}
