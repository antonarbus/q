import {
  BoqItemProvider,
  type Item as ItemType,
  ItemProvider,
  itemKey,
} from '@entities/quotation'
import { BoqItem } from './boq/BoqItem'
import { PasteItem } from './paste/PasteItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

type Props = {
  item: ItemType
  itemIndex: number
}

export const Item = ({ item, itemIndex }: Props): React.ReactNode => {
  return (
    <ItemProvider
      itemId={item.id}
      itemIndex={itemIndex}
      item={item}
    >
      {item.type === itemKey.text && <TextItem />}
      {item.type === itemKey.boq && (
        <BoqItemProvider>
          <BoqItem />
        </BoqItemProvider>
      )}
      {item.type === itemKey.price && <TotalPriceItem />}
      {item.type === itemKey.paste && <PasteItem />}
    </ItemProvider>
  )
}
