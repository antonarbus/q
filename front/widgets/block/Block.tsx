import { BlockProvider } from '@front/entities/quotation/provider/block/BlockProvider'
import type { BlockItem } from '@back/entity/quotation/schema'
import { BookmarkedRowBlock } from './bookmarked-row-block'
import { BoqBlock } from './boq-block'
import { PaymentBlock } from './payment-block/PaymentBlock'
import { PriceBlock } from './total-price-block'
import { TextBlock } from './text-block'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { PasteItemBlock } from './paste-block'
import { AnimatePresence } from 'motion/react'

type Props = {
  block: BlockItem
  blockIndex: number
}

export const Block = (props: Props): React.ReactNode => {
  const copyPlace = reduxHolder.useSelector((state) => state.clipboard.place)

  const isPasteTextShown = reduxHolder.useSelector((state) => state.clipboard.isPasteTextShown)

  const shouldShowPasteBefore =
    isPasteTextShown && copyPlace.id === props.block.id && copyPlace.pastePos === 'top'

  const shouldShowPasteAfter =
    isPasteTextShown && copyPlace.id === props.block.id && copyPlace.pastePos === 'bottom'

  return (
    <BlockProvider item={props.block} index={props.blockIndex}>
      <AnimatePresence>
        {shouldShowPasteBefore === true && <PasteItemBlock key='paste-before' />}
      </AnimatePresence>
      {props.block.type === 'text' && <TextBlock />}
      {props.block.type === 'boq' && <BoqBlock />}
      {props.block.type === 'price' && <PriceBlock />}
      {props.block.type === 'row' && <BookmarkedRowBlock />}
      {props.block.type === 'payment' && <PaymentBlock />}
      <AnimatePresence>
        {shouldShowPasteAfter === true && <PasteItemBlock key='paste-after' />}
      </AnimatePresence>
    </BlockProvider>
  )
}
