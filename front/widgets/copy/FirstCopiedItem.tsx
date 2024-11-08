import { getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { type Variants, AnimatePresence, motion } from 'framer-motion'
import { containerPadding, containerWidth, itemMarginBottom } from './const'
import { ScaledCopyItem } from './ScaledCopyItem'

type Props = {
  isCopying: boolean
  isSoleItem: boolean
  height: number
}

const variants: Variants = {
  initial: ({ isCopying, height }: Props) => {
    if (isCopying) {
      return {
        y: -height - 100,
      }
    }

    return {}
  },
  animate: ({ isCopying, isSoleItem }: Props) => {
    if (isCopying) {
      return {
        y: 0,
        transition: {
          delay: isSoleItem ? theme.copy.animationDuration : 0,
          duration: theme.copy.animationDuration,
          // type: 'spring',
          ease: 'linear',
        },
      }
    }

    return {}
  },
  exit: ({ isCopying, height }: Props) => {
    if (!isCopying) {
      return {
        y: -height - 100,
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          // type: 'tween',
          ease: 'linear',
        },
      }
    }

    return {}
  },
}

export const FirstCopiedItem = (): React.JSX.Element | null => {
  const items = useSelector((state) => state.copy.items)
  const isCopying = useSelector((state) => state.copy.isCopying)

  const firstItem = items[0]
  const firstPreview = getState().copy.previews[0]

  if (!firstItem?.width) return null
  if (!firstItem.height) return null

  const scaleFactorForFirstItem =
    (containerWidth - 2 * containerPadding) / firstItem.width

  const height = firstItem.height * scaleFactorForFirstItem
  const width = firstItem.width * scaleFactorForFirstItem

  const animationProps: Props = {
    isCopying,
    isSoleItem: items.length === 1,
    height,
  }

  return (
    <AnimatePresence
      mode='wait'
      custom={animationProps}
    >
      <motion.div
        key={items.length}
        custom={animationProps}
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        style={{
          height,
          width,
          marginTop: 15,
          marginBottom: itemMarginBottom,
          background: 'white',
          borderRadius: 4,
          boxShadow: '#00000033 0px 0px 6px 2px',
          overflow: 'hidden',
        }}
      >
        <ScaledCopyItem
          html={firstPreview ?? '∑'}
          width={firstItem.width}
          scaleFactor={String(scaleFactorForFirstItem)}
        />
      </motion.div>
    </AnimatePresence>
  )
}
