import { PressEscIcon } from '@feature/open-close/close-copy-modal'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useAnimatedCopyModalElement } from './useAnimatedCopyModalElement'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'
import { useModalFollowCursor } from './useModalFollowCursor'
import { useMovePasteText } from './useMovePasteText'
import { usePasteItemClick } from '@feature/blocks/paste-item/usePasteItemClick'

export const CopyModal = (): React.JSX.Element => {
  const copyModalElement = useAnimatedCopyModalElement()
  useMovePasteText()
  usePasteItemClick()
  useDisableNavItemsOnCopyModal()
  useModalFollowCursor({ copyModalRef: copyModalElement.ref })

  return (
    <CopyModalLayout ref={copyModalElement.ref}>
      <PressEscIcon />
      <FirstCopiedItem />
      <RestOfCopiedItems />
    </CopyModalLayout>
  )
}
