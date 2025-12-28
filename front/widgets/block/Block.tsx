import { itemType } from '@entities/quotation/const/itemType'
import { BlockProvider } from '@entities/quotation/provider/BlockProvider'
import type { BlockItem } from '@root/shared/types/BlockItem'
import type { ReactNode } from 'react'
import { BookmarkedRowBlock } from './bookmarked-row-block'
import { BoqBlock } from './boq-block'
import { PasteItemBlock } from './paste-block'
import { PriceBlock } from './price-block'
import { TextBlock } from './text-block'

type Props = {
  block: BlockItem
  blockIndex: number
}

export const Block = (props: Props): ReactNode => {
  return (
    <BlockProvider item={props.block} index={props.blockIndex}>
      {props.block.type === itemType.text && <TextBlock />}
      {props.block.type === itemType.boq && <BoqBlock />}
      {props.block.type === itemType.price && <PriceBlock />}
      {props.block.type === itemType.row && <BookmarkedRowBlock />}
      {props.block.type === itemType.paste && <PasteItemBlock />}
    </BlockProvider>
  )
}
