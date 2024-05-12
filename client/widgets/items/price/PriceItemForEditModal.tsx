import { onPriceItemResizeStop } from '@features/items/resize_item'
import { ItemComp } from '@entities/quotation'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const PriceItemForEditModal = (): JSX.Element => {
  return (
    <ItemComp
      className='price-item'
      onItemResizeStop={onPriceItemResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <PriceHeader />
      <PriceMain />
    </ItemComp>
  )
}
