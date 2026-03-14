import { useMovePasteText, usePasteClick } from '@feature/blocks/paste'
import { PressEscIcon } from '@feature/open-close/close-copy-modal'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useAnimatedCopyModalElement } from './useAnimatedCopyModalElement'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'
import { useModalFollowCursor } from './useModalFollowCursor'

export const CopyModal = (): React.JSX.Element => {
  const copyModalElement = useAnimatedCopyModalElement()
  useMovePasteText()
  usePasteClick()
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
