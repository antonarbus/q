import { useMovePasteText, usePasteClick } from '@feature/blocks/paste'
import {
  PressEscIcon,
  useEnableEditorsOnCloseCopyModal,
} from '@feature/open-close/close-copy-modal'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useAnimatedCopyModalElement } from './useAnimatedCopyModalElement'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'

export const CopyModal = (): React.JSX.Element => {
  const copyModalElement = useAnimatedCopyModalElement()
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsOnCopyModal()
  useEnableEditorsOnCloseCopyModal()

  return (
    <CopyModalLayout ref={copyModalElement.ref}>
      <PressEscIcon />
      <FirstCopiedItem />
      <RestOfCopiedItems />
    </CopyModalLayout>
  )
}
