import { getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import type { JSX } from 'react'
import { containerPadding, containerWidth, itemMarginBottom } from './const'
import { ScaledCopyItem } from './ScaledCopyItem'

type Props = {
  isCopying: boolean
  isSoleItem: boolean
  height: number
}

const variants: Variants = {
  initial: ({ isCopying, height }: Props) => {
    if (isCopying === true) {
      return {
        y: -height - 100,
      }
    }

    return {}
  },
  animate: ({ isCopying, isSoleItem }: Props) => {
    if (isCopying === true) {
      return {
        y: 0,
        transition: {
          delay: isSoleItem === true ? theme.copy.animationDuration : 0,
          duration: theme.copy.animationDuration,
          // type: 'spring',
          ease: 'linear',
        },
      }
    }

    return {}
  },
  exit: ({ isCopying, height }: Props) => {
    if (isCopying === false) {
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

export const FirstCopiedItem = (): JSX.Element | null => {
  const items = useSelector((state) => state.copy.items)
  const isCopying = useSelector((state) => state.copy.isCopying)

  const [firstItem] = items
  const [firstPreview] = getState().copy.previews

  if (firstItem?.width === undefined) {
    return null
  }

  if (firstItem.height === undefined) {
    return null
  }

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
    <AnimatePresence custom={animationProps} mode='wait'>
      <motion.div
        animate='animate'
        custom={animationProps}
        exit='exit'
        initial='initial'
        key={items.length}
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
        variants={variants}
      >
        <ScaledCopyItem
          html={firstPreview ?? '∑'}
          scaleFactor={String(scaleFactorForFirstItem)}
          width={firstItem.width}
        />
      </motion.div>
    </AnimatePresence>
  )
}
