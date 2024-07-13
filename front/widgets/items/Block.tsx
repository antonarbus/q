import {
  type Item as ItemType,
  ItemProvider,
  itemKey,
} from '@entities/quotation'
import { BoqBlock } from './boq/BoqBlock'
import { PasteItem } from './paste/PasteItem'
import { PriceBlock } from './price/PriceBlock'
import { TextBlock } from './text/TextBlock'

type Props = {
  item: ItemType
  itemIndex: number
}

export const Block = ({ item, itemIndex }: Props): React.ReactNode => {
  return (
    <ItemProvider
      itemId={item.id}
      itemIndex={itemIndex}
      item={item}
    >
      {item.type === itemKey.text && <TextBlock />}
      {item.type === itemKey.boq && <BoqBlock />}
      {item.type === itemKey.price && <PriceBlock />}
      {item.type === itemKey.paste && <PasteItem />}
    </ItemProvider>
  )
}
