import { BookmarkItemIcon } from '@features/bookmark'
import { CopyItemIcon } from '@features/copy'
import { CutItemIcon } from '@features/cut'
import { DeleteItemIcon } from '@features/delete'
import { DragItemIcon } from '@features/drag'
import { OpenInfoItemModalIcon } from '@features/open_close/open_info_item_modal'
import { onPriceItemResizeStop } from '@features/resize'
import { ItemComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <ItemComp
      className={cls.priceItem}
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
          <BookmarkItemIcon />
          <OpenInfoItemModalIcon />
          <DeleteItemIcon />
        </ItemActionButtonsLayout>
      )}
    >
      <PriceHeader />
      <PriceMain />
    </ItemComp>
  )
}
