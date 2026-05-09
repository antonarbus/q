import { PressEscIcon } from '@front/features/open-close/close-copy-modal'
import { ClipboardModalLayout } from './ClipboardModalLayout'
import { FirstClipboardItem } from './FirstClipboardItem'
import { RestClipboardItems } from './RestClipboardItems'
import { useAnimatedClipboardModalElement } from './useAnimatedClipboardModalElement'
import { useClipboardModalFollowCursor } from './useClipboardModalFollowCursor'
import { useMovePasteText } from './useMovePasteText'
import { usePasteItemClick } from '@front/features/blocks/paste-item/usePasteItemClick'

export const ClipboardModal = (): React.JSX.Element => {
  const copyModalElement = useAnimatedClipboardModalElement()
  useMovePasteText()
  usePasteItemClick()
  useClipboardModalFollowCursor({ copyModalRef: copyModalElement.ref })

  return (
    <ClipboardModalLayout ref={copyModalElement.ref}>
      <PressEscIcon />
      <FirstClipboardItem />
      <RestClipboardItems />
    </ClipboardModalLayout>
  )
}
