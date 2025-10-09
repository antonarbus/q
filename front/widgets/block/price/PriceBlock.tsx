import { BlockComp } from '@entities/quotation'
import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import { onPriceBlockResizeStop } from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@features/open-close/open-info-modal'
import { cls } from '@shared/const/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import type { JSX } from 'react'
import { PriceHeader } from './price-header/PriceHeader'
import { PriceMain } from './price-main/PriceMain'

export const PriceBlock = (): JSX.Element => {
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
