import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { BookmarkBlockIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@front/features/open-close/open-info-modal'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'

export const RightBlockActionButtons = (): React.JSX.Element => {
  return (
    <ItemActionButtonsLayout>
      <BookmarkBlockIcon />
      <OpenInfoBlockModalIcon />
      <DeleteBlockIcon />
    </ItemActionButtonsLayout>
  )
}
