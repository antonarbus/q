import { BoqItemProvider, itemKey, useItem } from '@entities/quotation'
import { BoqItem } from './boq/BoqItem'
import { PasteItem } from './paste/PasteItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

export const Item = (): React.ReactNode => {
  const { item } = useItem()

  if (item.type === itemKey.text) {
    return <TextItem />
  }

  if (item.type === itemKey.boq) {
    return (
      <BoqItemProvider>
        <BoqItem />
      </BoqItemProvider>
    )
  }

  if (item.type === itemKey.price) {
    return <TotalPriceItem />
  }

  if (item.type === itemKey.paste) {
    return <PasteItem key={item.id} />
  }

  return null
}
