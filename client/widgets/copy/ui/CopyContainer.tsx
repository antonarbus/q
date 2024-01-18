import { motion } from 'framer-motion'
import { PressEsc } from '@features/close_copy_container_on_esc_key'
import { useMovePasteText } from '@features/move_paste_text'
import { usePasteClick } from '@features/paste_item'
import { useDisableNavItems } from '@entities/nav'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useCopyContainerAnimation } from './useCopyContainerAnimation'
import { useCursorCords } from './useCursorCords'

export const CopyContainer = (): JSX.Element => {
  useMovePasteText()
  usePasteClick()
  useDisableNavItems()
  const copyContainerAnimationControls = useCopyContainerAnimation()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 300, y: 0 }

  return (
    <motion.div
      animate={copyContainerAnimationControls}
      css={{
        borderRadius: 6,
        position: 'fixed',
        zIndex: 3,
        top: y + 30,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 6px 2px',
        overflow: 'hidden',
        height: 0,
        width: 0,
        maxHeight: 265,
      }}
    >
      <div
        css={{
          margin: 10, // needed to have a gap at the bottom specifically, otherwise overflow: hidden trims the content at the bottom edge
          padding: 10, // needed to avoid shadow trimming by overflow: hidden
          overflowY: 'hidden',
          maxHeight: 240,
        }}
      >
        <PressEsc />
        <FirstCopiedItem />
        <RestOfCopiedItems />
      </div>
    </motion.div>
  )
}
