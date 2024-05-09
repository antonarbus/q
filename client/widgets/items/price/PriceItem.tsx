import { CopyItemIcon } from '@features/items/copy_item'
import { CutItemIcon } from '@features/items/cut_item'
import { DeleteItemIcon } from '@features/items/delete_item'
import { DragItemIcon } from '@features/items/drag_item'
import { InfoItemIcon } from '@features/items/open_info_item_modal'
import { onPriceItemResizeStop } from '@features/items/resize_item'
import { SaveItemIcon } from '@features/items/save_item'
import { ItemComp } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <ItemComp
      onItemResizeStop={onPriceItemResizeStop}
      leftItemActionButtons={(
        <ItemActionButtonsLayout>
          <DragItemIcon />
          <CopyItemIcon />
          <CutItemIcon />
        </ItemActionButtonsLayout>
      )}
      rightItemActionButtons={(
        <ItemActionButtonsLayout>
          <SaveItemIcon />
          <InfoItemIcon />
          <DeleteItemIcon />
        </ItemActionButtonsLayout>
      )}
    >
      <PriceHeader />
      <PriceMain />
    </ItemComp>
  )
}
