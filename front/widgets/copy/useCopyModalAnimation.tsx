import { copySlice } from '@entities/copy/copySlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { type AnimationScope, useAnimate } from 'motion/react'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { containerPadding, containerWidth } from './const'

export const useCopyModalAnimation = (): AnimationScope => {
  const [scope, animate] = useAnimate()
  const isFirstMount = useFirstMountState()
  const items = useSelector((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      if (item.width === undefined) {
        return 0
      }

      if (item.height === undefined) {
        return 0
      }

      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width

      return accumulator + scaleFactor * item.height + 5
    }, 70)

    if (isFirstMount === true) {
      void animate(
        scope.current,
        {
          width: 'auto',
        },
        {
          delay: 0,
          duration: theme.copy.animationDuration,
          ease: 'linear',
        },
      )
    }

    void animate(
      scope.current,
      {
        height: newHeight,
      },
      {
        delay: 0,
        duration: theme.copy.animationDuration,
        ease: 'linear',
      },
    )

    dispatch(copySlice.actions.forbidAllActions())

    setTimeout(() => {
      dispatch(copySlice.actions.allowAllActions())
    }, 1000 * theme.block.animationDuration)
  }, [items.length])

  return scope
}
