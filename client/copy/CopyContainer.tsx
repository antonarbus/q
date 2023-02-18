import hash from 'object-hash'
import { useSelectorTyped } from 'client/store'
import { useCursorCords } from './useCursorCords'
import { motion } from 'framer-motion'
import { PressEsc } from './PressEsc'
import { useRef } from 'react'
import { usePastePosition } from './usePastePosition'
import { useFirstMountState } from 'react-use'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'

export const containerWidth = 200
export const containerPadding = 20
export const marginBottomForRestOfItems = 5

export const CopyContainer = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  usePastePosition()
  const items = useSelectorTyped(state => state.copy.items)
  const isFirstMount = useFirstMountState()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 300, y: 0 }

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
        width: containerWidth,
        borderRadius: 6,
        position: 'fixed',
        zIndex: 3,
        top: y + 30,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
      }}
    >
      <div
        css={{
          overflow: 'hidden',
          marginBottom: 10, // needed to have it, otherwise overflow: hidden trims the content, without a gap looks terrible
          maxHeight: 300,
        }}
      >
        <div
          // needed for main container height animation
          // moved padding here from the main container, otherwise height is animated badly
          css={{
            padding: containerPadding,
            paddingBottom: 5,
            // outline: '1px solid red',
            // background: 'red'
          }}
        >
          <PressEsc />
          <FirstCopiedItem />
          <RestOfCopiedItems />
        </div>
      </div>
    </motion.div>
  )
}
