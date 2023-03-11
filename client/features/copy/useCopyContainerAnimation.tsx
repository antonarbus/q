import { useEffect } from 'react'
import { useAnimationControls } from 'framer-motion'
import { useFirstMountState } from 'react-use'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth } from './CopyContainer'

export const useCopyContainerAnimation = () => {
  const controls = useAnimationControls()
  const isFirstMount = useFirstMountState()
  const items = useSelectorTyped(state => state.copy.items)

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

  return controls
}
