import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import { containerPadding, containerWidth, itemMarginBottom } from './const'
import { ScaledCopyItem } from './ScaledCopyItem'

type Props = {
  isCopying: boolean
  firstItemHeight: number
  prevFirstItemHeight: number
}

const variants: Variants = {
  animate: ({ isCopying }: Props) => {
    if (isCopying === true) {
      return {
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          // Type: 'spring',
          ease: 'linear',
        },
        y: 0,
      }
    }

    return {}
  },
  exit: ({ isCopying, prevFirstItemHeight }: Props) => {
    if (isCopying === false) {
      return {
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          // Type: 'spring',
          ease: 'linear',
        },
        y: -prevFirstItemHeight,
      }
    }

    return {}
  },
  initial: ({ isCopying, firstItemHeight }: Props) => {
    if (isCopying === true) {
      return {
        y: -firstItemHeight,
      }
    }

    return {}
  },
}

export const RestOfCopiedItems = (): React.JSX.Element | null => {
  const items = reduxHolder.useSelector((state) => state.copy.items)
  const isCopying = reduxHolder.useSelector((state) => state.copy.isCopying)
  const [prevFirstItemHeight, setPrevFirstItemHeight] = useState(0)

  const [firstItem] = items

  const scaleFactorForFirstItem =
    firstItem?.width === undefined ? 0 : (containerWidth - 2 * containerPadding) / firstItem.width

  const firstItemHeight =
    firstItem?.height === undefined
      ? 0
      : firstItem.height * scaleFactorForFirstItem + itemMarginBottom

  const animationProps: Props = {
    firstItemHeight,
    isCopying,
    prevFirstItemHeight,
  }

  useEffect(() => {
    setPrevFirstItemHeight(firstItemHeight)
  }, [firstItemHeight])

  if (firstItem?.width === undefined) {
    return null
  }

  return (
    <AnimatePresence custom={animationProps} mode='wait'>
      <motion.div
        animate='animate'
        custom={animationProps}
        exit='exit'
        initial='initial'
        key={items.length}
        variants={variants}
      >
        {items.map((item, index) => {
          const scaleFactor = (containerWidth - 2 * containerPadding) / item.width

          const preview = reduxHolder.getState().copy.previews[index]

          if (index === 0) {
            return null
          }

          return (
            <div
              key={item.id}
              style={{
                height: item.height * scaleFactor,
                marginBottom: itemMarginBottom,
                width: item.width * scaleFactor,
                overflow: 'hidden',
                borderRadius: '6px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 6px 2px',
              }}
            >
              <ScaledCopyItem
                html={preview ?? ''}
                scaleFactor={String(scaleFactor)}
                width={item.width}
              />
            </div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
