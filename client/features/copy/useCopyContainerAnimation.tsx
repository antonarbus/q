import { useEffect } from 'react'
import { useAnimationControls } from 'framer-motion'
import { useFirstMountState } from 'react-use'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth } from './CopyContainer'
import { theme } from 'client/theme'

export const useCopyContainerAnimation = () => {
  const copyContainerAnimationControls = useAnimationControls()
  const isFirstMount = useFirstMountState()
  const items = useSelectorTyped(state => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      if (item.type === 'paste') return accumulator
      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width
      return accumulator + scaleFactor * item.height + 5
    }, 70)

    isFirstMount && copyContainerAnimationControls.start({
      width: 'auto',
      transition: {
        delay: 0,
        duration: theme.copy.animationDuration,
        type: 'spring'
      }
    })

    copyContainerAnimationControls.start({
      height: newHeight,
      transition: {
        delay: 0,
        duration: theme.copy.animationDuration,
        type: 'spring'
      },
    })
  }, [items.length])

  return copyContainerAnimationControls
}
