import { CopyItemIcon } from '@features/items/copy'
import { CutItemIcon } from '@features/items/cut'
import { DeleteItemIcon } from '@features/items/delete'
import { DragItemIcon } from '@features/items/drag'
import { BookmarkItemIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoItemModalIcon } from '@features/open_close/open_info_modal'
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
