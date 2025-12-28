import { useMovePasteText, usePasteClick } from '@features/blocks/paste'
import {
  PressEscIcon,
  useEnableFroalasOnCloseCopyModal,
} from '@features/open-close/close-copy-modal'
import type { JSX } from 'react'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useAnimatedCopyModalElement } from './useAnimatedCopyModalElement'
import { useCursorPos } from './useCursorPos'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'

export const CopyModal = (): JSX.Element => {
  const copyModalElement = useAnimatedCopyModalElement()
  useCursorPos({ copyModalRef: copyModalElement.ref })
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsOnCopyModal()
  useEnableFroalasOnCloseCopyModal()

  return (
    <CopyModalLayout ref={copyModalElement.ref}>
      <PressEscIcon />
      <FirstCopiedItem />
      <RestOfCopiedItems />
    </CopyModalLayout>
  )
}
