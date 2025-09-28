import { motion } from 'motion/react'
import { usePasteClick, useMovePasteText } from '@features/blocks/paste'
import {
  PressEscIcon,
  useEnableFroalasOnCloseCopyModal,
} from '@features/open-close/close-copy-modal'
import { cursorPosSignal } from '@shared/util/cursorPosSignal'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useCopyModalAnimation } from './useCopyModalAnimation'
import { useDisableNavItemsOnCopyModal } from './useDisableNavItemsOnCopyModal'
import type { JSX } from 'react'

export const CopyModal = (): JSX.Element => {
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsOnCopyModal()
  useEnableFroalasOnCloseCopyModal()
  const copyModalRef = useCopyModalAnimation()
  const { x, y } = cursorPosSignal.value
  // const { x, y } = { x: 300, y: 0 }

  return (
    <motion.div
      css={{
        borderRadius: 6,
        position: 'fixed',
        zIndex: 1001,
        top: y + 30,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 6px 2px',
        overflow: 'hidden',
        height: 0,
        width: 0,
        maxHeight: 265,
        '.static-html .fr-element.fr-view': {
          opacity: '1 !important',
        },
      }}
      ref={copyModalRef}
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
