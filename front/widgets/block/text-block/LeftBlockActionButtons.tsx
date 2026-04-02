import { CopyBlockIcon } from '@front/features/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'

export const LeftBlockActionButtons = (): React.JSX.Element => {
  return (
    <ItemActionButtonsLayout>
      <DragBlockIcon />
      <CopyBlockIcon />
      <CutBlockIcon />
    </ItemActionButtonsLayout>
  )
}
