import { useCursorCords } from './useCursorCords'
import { motion, useAnimationControls } from 'framer-motion'
import { PressEsc } from './PressEsc'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { FirstCopiedItem } from './FirstCopiedItem'
import { RestOfCopiedItems } from './RestOfCopiedItems'
import { useDisableNavItems } from './useDisableNavItems'
import { usePasteClick } from './usePasteClick'
import { usePasteTextPos } from './usePasteTextPos'
import { useSelectorTyped } from 'client/store'

export const containerWidth = 200
export const containerPadding = 20
export const itemMarginBottom = 5

export const CopyContainer = () => {
  usePasteTextPos()
  usePasteClick()
  useDisableNavItems()
  const isFirstMount = useFirstMountState()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 300, y: 0 }
  const items = useSelectorTyped(state => state.copy.items)
  const controls = useAnimationControls()

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width
      return accumulator + scaleFactor * item.height + 5
    }, 70)

    isFirstMount && controls.start({
      width: 'auto',
      transition: { delay: 0, duration: 0.5, type: 'spring' }
    })

    controls.start({
      height: newHeight,
      transition: { delay: 0, duration: 0.5, type: 'spring' },
    })
  }, [items.length])

  return (
    <motion.div
      // key={items.length}
      // initial={{
      //   height: ref?.current?.offsetHeight || 0,
      //   ...(isFirstMount && { width: 0 })
      // }}
      // animate={{
      //   height: 'auto',
      //   ...(isFirstMount && { width: 'auto' })
      // }}
      // transition={{
      //   delay: 0, duration: 0.5, type: 'spring'
      // }}
      animate={controls}
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
        maxHeight: 265
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
