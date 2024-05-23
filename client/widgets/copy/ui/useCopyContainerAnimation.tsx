import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useAnimationControls, type AnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { copySlice } from '@entities/copy'
import { containerPadding, containerWidth } from './const'

export const useCopyContainerAnimation = (): AnimationControls => {
  const copyContainerAnimationControls = useAnimationControls()
  const isFirstMount = useFirstMountState()
  const items = useSelectorTyped((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      if (!item?.width) return 0
      if (!item?.height) return 0

      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width
      return accumulator + scaleFactor * item.height + 5
    }, 70)

    if (isFirstMount) {
      void copyContainerAnimationControls.start({
        width: 'auto',
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          ease: 'linear',
        },
      })
    }

    void copyContainerAnimationControls.start({
      height: newHeight,
      transition: {
        delay: 0,
        duration: theme.copy.animationDuration,
        ease: 'linear',
      },
    })

    dispatch(copySlice.actions.forbidAllActions())

    setTimeout(() => {
      dispatch(copySlice.actions.allowAllActions())
    }, 1000 * theme.item.animationDuration)
  }, [items.length])

  return copyContainerAnimationControls
}
