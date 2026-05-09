import { copySlice } from '@front/entities/clipboard/copySlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { useAnimate } from 'motion/react'
import type { AnimationScope } from 'motion/react'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { containerPadding, containerWidth } from './const'

type Res = {
  ref: AnimationScope<HTMLDivElement>
}

export const useAnimatedCopyModalElement = (): Res => {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const isFirstMount = useFirstMountState()
  const items = reduxHolder.useSelector((state) => state.copy.items)

  useEffect(() => {
    const newHeight = items.reduce((accumulator, item) => {
      const scaleFactor = (containerWidth - 2 * containerPadding) / item.width

      return accumulator + scaleFactor * item.height + 5
    }, 70)

    if (isFirstMount === true) {
      animate(
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

    animate(
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

    reduxHolder.dispatch(copySlice.actions.forbidAllActions())

    setTimeout(() => {
      reduxHolder.dispatch(copySlice.actions.allowAllActions())
    }, 1000 * theme.block.animationDuration)
  }, [items.length])

  return {
    ref: scope,
  }
}
