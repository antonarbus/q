import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { BookmarkBlockIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@front/features/open-close/open-info-modal'
import { cls } from '@front/shared/cls'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'
import { PriceHeader } from './total-price-header/TotalPriceHeader'
import { PriceMain } from './total-price-main/TotalPriceMain'
import { CopyBlockIcon } from '@front/features/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import { onPriceBlockResizeStop } from '@front/features/blocks/resize-price-block/onPriceBlockResize'

export const TotalPriceBlock = (): React.JSX.Element => {
  return (
    <BlockComp
      className={cls.priceBlock}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      onBlockResizeStop={onPriceBlockResizeStop}
      rightBlockActionButtons={
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
