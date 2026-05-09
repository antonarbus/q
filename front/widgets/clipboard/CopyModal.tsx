import { PressEscIcon } from '@front/features/open-close/close-copy-modal'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useAnimatedCopyModalElement } from './useAnimatedCopyModalElement'
import { useModalFollowCursor } from './useModalFollowCursor'
import { useMovePasteText } from './useMovePasteText'
import { usePasteItemClick } from '@front/features/blocks/paste-item/usePasteItemClick'

export const CopyModal = (): React.JSX.Element => {
  const copyModalElement = useAnimatedCopyModalElement()
  useMovePasteText()
  usePasteItemClick()
  useModalFollowCursor({ copyModalRef: copyModalElement.ref })

  return (
    <CopyModalLayout ref={copyModalElement.ref}>
      <PressEscIcon />
      <FirstCopiedItem />
      <RestOfCopiedItems />
    </CopyModalLayout>
  )
}
