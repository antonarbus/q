import { useEffect } from 'react'
import { useAnimationControls, type AnimationControls } from 'framer-motion'
import { useFirstMountState } from 'react-use'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { containerPadding, containerWidth } from './CopyContainer'
import { theme } from 'client/shared/clients'
import { allowToCopy, allowToCut, allowToDelete, allowToPaste, forbidToCopy, forbidToCut, forbidToDelete, forbidToPaste } from 'client/entities/copy'

export const useCopyContainerAnimation = (): AnimationControls => {
  const dispatch = useDispatchTyped()
  const copyContainerAnimationControls = useAnimationControls()
  const isFirstMount = useFirstMountState()
  const items = useSelectorTyped(state => state.copy.items)

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

    dispatch(forbidToPaste())
    dispatch(forbidToCopy())
    dispatch(forbidToCut())
    dispatch(forbidToDelete())

    setTimeout(() => {
      dispatch(allowToPaste())
      dispatch(allowToCopy())
      dispatch(allowToCut())
      dispatch(allowToDelete())
    }, 1000 * theme.item.animationDuration)

  }, [items.length])

  return copyContainerAnimationControls
}
