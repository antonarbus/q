import {
  type Block as BlockType,
  BlockProvider,
  itemKey,
} from '@entities/quotation'
import { BoqBlock } from './boq/BoqBlock'
import { PasteItem } from './paste/PasteItem'
import { PriceBlock } from './price/PriceBlock'
import { TextBlock } from './text/TextBlock'

type Props = {
  block: BlockType
  blockIndex: number
}

export const Block = ({ block, blockIndex }: Props): React.ReactNode => {
  return (
    <BlockProvider
      id={block.id}
      blockIndex={blockIndex}
      block={block}
    >
      {block.type === itemKey.text && <TextBlock />}
      {block.type === itemKey.boq && <BoqBlock />}
      {block.type === itemKey.price && <PriceBlock />}
      {block.type === itemKey.paste && <PasteItem />}
    </BlockProvider>
  )
}
