import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import { CopyBlockIcon } from '@front/features/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { BookmarkBlockIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@front/features/open-close/open-info-modal'
import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { ClientPayment } from './client-payment'
import { OwnerPayment } from './owner-payment'
import { onPaymentBlockResizeStop } from '@front/features/blocks/resize-payment-block/onPaymentBlockResize'
import type { FC } from 'react'

export const PaymentBlock: FC = () => {
  const isEditorView = useIsEditorView()

  return (
    <BlockComp
      minWidth='250px'
      onBlockResizeStop={onPaymentBlockResizeStop}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      rightBlockActionButtons={
        <ItemActionButtonsLayout>
          <BookmarkBlockIcon />
          <OpenInfoBlockModalIcon />
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      {isEditorView ? <OwnerPayment /> : <ClientPayment />}
    </BlockComp>
  )
}
