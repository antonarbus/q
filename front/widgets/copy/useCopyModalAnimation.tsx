import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useAnimation, type AnimationControls } from 'motion/react'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { copySlice } from '@entities/copy'
import { containerPadding, containerWidth } from './const'

export const useCopyModalAnimation = (): AnimationControls => {
  const copyModalAnimationControls = useAnimation()
  const isFirstMount = useFirstMountState()
  const items = useSelector((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      if (!item.width) {
        return 0
      }

      if (!item.height) {
        return 0
      }

      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width

      return accumulator + scaleFactor * item.height + 5
    }, 70)

    if (isFirstMount) {
      void copyModalAnimationControls.start({
        width: 'auto',
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          ease: 'linear',
        },
      })
    }

    void copyModalAnimationControls.start({
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
    }, 1000 * theme.block.animationDuration)
  }, [items.length])

  return copyModalAnimationControls
}
