import { useEffect } from 'react'
import type { AnimationControls } from 'framer-motion';
import { useAnimationControls } from 'framer-motion'
import { useFirstMountState } from 'react-use'
import { useSelectorTyped } from 'client/shared/hooks'
import { containerPadding, containerWidth } from './CopyContainer'
import { theme } from 'client/shared/clients'

export const useCopyContainerAnimation = (): AnimationControls => {
  const copyContainerAnimationControls = useAnimationControls()
  const isFirstMount = useFirstMountState()
  const items = useSelectorTyped((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width
      return accumulator + scaleFactor * item.height + 5
    }, 70)

    if (isFirstMount) {
      void copyContainerAnimationControls.start({
        width: 'auto',
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          type: 'spring',
        },
      })
    }

    void copyContainerAnimationControls.start({
      height: newHeight,
      transition: {
        delay: 0,
        duration: theme.copy.animationDuration,
        type: 'spring',
      },
    })

  }, [items.length])

  return copyContainerAnimationControls
}
