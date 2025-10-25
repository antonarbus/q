import { useMovePasteText, usePasteClick } from '@features/blocks/paste'
import {
  PressEscIcon,
  useEnableFroalasOnCloseCopyModal,
} from '@features/open-close/close-copy-modal'
import { motion } from 'motion/react'
import type { JSX } from 'react'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useCopyModalAnimation } from './useCopyModalAnimation'
import { useCursorPos } from './useCursorPos'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'

export const CopyModal = (): JSX.Element => {
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsOnCopyModal()
  useEnableFroalasOnCloseCopyModal()
  const copyModalRef = useCopyModalAnimation()
  const cursorPos = useCursorPos()

  return (
    <motion.div
      ref={copyModalRef}
      css={{
        position: 'fixed',
        zIndex: 1001,
        top: cursorPos.y + 30,
        left: cursorPos.x + 15,
        overflow: 'hidden',
        height: 0,
        width: 0,
        maxHeight: 265,
        '.static-html .fr-element.fr-view': {
          opacity: '1 !important',
        },

        // liquid glass
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        style={{
          margin: 10, // needed to have a gap at the bottom specifically, otherwise overflow: hidden trims the content at the bottom edge
          padding: 10, // needed to avoid shadow trimming by overflow: hidden
          overflowY: 'hidden',
          maxHeight: 240,
        }}
      >
        <PressEscIcon />
        <FirstCopiedItem />
        <RestOfCopiedItems />
      </div>
    </motion.div>
  )
}
