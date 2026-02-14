import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { CopyBlockIcon } from '@feature/blocks/copy'
import { CutBlockIcon } from '@feature/blocks/cut'
import { DeleteBlockIcon } from '@feature/blocks/delete'
import { DragBlockIcon } from '@feature/blocks/drag'
import { onPriceBlockResizeStop } from '@feature/blocks/resize'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { PriceHeader } from './price-header/PriceHeader'
import { PriceMain } from './price-main/PriceMain'

export const PriceBlock = (): React.JSX.Element => {
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
