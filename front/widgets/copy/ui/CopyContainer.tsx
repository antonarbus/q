import { motion } from 'framer-motion'
import { usePasteClick, useMovePasteText } from '@features/blocks/paste'
import { PressEscIcon } from '@features/open_close/close_copy_container'
import { cursorPosSignal } from '@shared/utils/cursorPosSignal'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useCopyContainerAnimation } from './useCopyContainerAnimation'
import { useDisableNavItemsExceptNewAndQuotations } from './useDisableNavItemsExceptNewAndQuotations'

export const CopyContainer = (): JSX.Element => {
  useMovePasteText()
  usePasteClick()
  useDisableNavItemsExceptNewAndQuotations()
  const copyContainerAnimationControls = useCopyContainerAnimation()
  const { x, y } = cursorPosSignal.value
  // const { x, y } = { x: 300, y: 0 }

  return (
    <motion.div
      animate={copyContainerAnimationControls}
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
