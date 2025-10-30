import { useMovePasteText, usePasteClick } from '@features/blocks/paste'
import {
  PressEscIcon,
  useEnableFroalasOnCloseCopyModal,
} from '@features/open-close/close-copy-modal'
import type { JSX } from 'react'
import { CopyModalLayout } from './CopyModalLayout'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useCopyModalAnimation } from './useCopyModalAnimation'
import { useCursorPos } from './useCursorPos'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'

export const CopyModal = (): JSX.Element => {
  const { copyModalRef } = useCopyModalAnimation()
  useCursorPos({ copyModalRef })
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsOnCopyModal()
  useEnableFroalasOnCloseCopyModal()

  return (
    <CopyModalLayout ref={copyModalRef}>
      <PressEscIcon />
      <FirstCopiedItem />
      <RestOfCopiedItems />
    </CopyModalLayout>
  )
}
