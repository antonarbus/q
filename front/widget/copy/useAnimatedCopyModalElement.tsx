import { copySlice } from '@entity/copy/copySlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { type AnimationScope, useAnimate } from 'motion/react'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { containerPadding, containerWidth } from './const'

type Res = {
  ref: AnimationScope<HTMLDivElement>
}

export const useAnimatedCopyModalElement = (): Res => {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const isFirstMount = useFirstMountState()
  const items = useSelector((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
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

  return {
    ref: scope,
  }
}
