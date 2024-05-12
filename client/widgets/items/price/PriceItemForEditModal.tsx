import { onPriceItemResizeStop } from '@features/items/resize_item'
import { ItemComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const PriceItemForEditModal = (): JSX.Element => {
  return (
    <ItemComp
      className={cls.priceItem}
      onItemResizeStop={onPriceItemResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <PriceHeader />
      <PriceMain />
    </ItemComp>
  )
}
