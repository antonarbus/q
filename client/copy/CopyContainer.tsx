import hash from 'object-hash'
import { useSelectorTyped } from 'client/store'
import { useCursorCords } from './useCursorCords'
import { motion } from 'framer-motion'
import { PressEsc } from './PressEsc'
import { useRef } from 'react'
import { usePasteMove } from './usePasteMove'
import { useFirstMountState } from 'react-use'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useDisableNavItems } from './useDisableNavItems'
import { usePasteClick } from './usePasteClick'

export const containerWidth = 200
export const containerPadding = 20
export const marginBottomForRestOfItems = 5

export const CopyContainer = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  usePasteMove()
  usePasteClick()
  useDisableNavItems()
  const items = useSelectorTyped(state => state.copy.items)
  const isFirstMount = useFirstMountState()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 300, y: 0 }

  if (!items.length) return null

  return (
    <motion.div
      ref={ref}
      initial={{
        height: ref?.current?.offsetHeight || 0,
        ...(isFirstMount && { width: 0 })
      }}
      animate={{
        height: 'auto',
        ...(isFirstMount && { width: 'auto' })
      }}
      transition={{ delay: 0, duration: 1.1, type: 'spring' }}
      key={hash(items)}
      css={{
        borderRadius: 6,
        position: 'fixed',
        zIndex: 3,
        top: y + 30,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
        overflow: 'hidden',
        width: 'auto',
      }}
    >
      <div
        css={{
          margin: 10, // needed to have a gap at the bottom specifically, otherwise overflow: hidden trims the content at the bottom edge
          padding: 5, // needed to avoid shadow trimming by overflow: hidden
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
