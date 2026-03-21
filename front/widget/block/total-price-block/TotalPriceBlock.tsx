import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { PriceHeader } from './total-price-header/TotalPriceHeader'
import { PriceMain } from './total-price-main/TotalPriceMain'
import { CopyBlockIcon } from '@feature/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@feature/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@feature/blocks/delete-item/DeleteBlockIcon'
import { DragBlockIcon } from '@feature/blocks/drag-item/DragBlockIcon'
import { onPriceBlockResizeStop } from '@feature/blocks/resize-price-block/onPriceBlockResize'

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
