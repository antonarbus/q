import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import { onPriceBlockResizeStop } from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBlockModalIcon } from '@features/open_close/open_item_info_modal'
import { BlockComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const PriceBlock = (): JSX.Element => {
  return (
    <BlockComp
      className={cls.priceBlock}
      onItemResizeStop={onPriceBlockResizeStop}
      leftItemActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      rightItemActionButtons={
        <ItemActionButtonsLayout>
          <BookmarkBlockIcon />
          <OpenInfoBlockModalIcon />
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      <PriceHeader />
      <PriceMain />
    </BlockComp>
  )
}
