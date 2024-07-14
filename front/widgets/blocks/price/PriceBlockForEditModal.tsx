import { onPriceBlockResizeStop } from '@features/items/resize'
import { BlockComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const PriceBlockForEditModal = (): JSX.Element => {
  return (
    <BlockComp
      className={cls.priceBlock}
      onItemResizeStop={onPriceBlockResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <PriceHeader />
      <PriceMain />
    </BlockComp>
  )
}
