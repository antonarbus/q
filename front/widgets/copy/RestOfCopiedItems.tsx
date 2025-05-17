import { getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { type Variants, AnimatePresence, motion } from 'motion/react'
import { useRef } from 'react'
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
          // type: 'spring',
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
          // type: 'spring',
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
  const items = useSelector((state) => state.copy.items)
  const isCopying = useSelector((state) => state.copy.isCopying)
  const prevFirstItemHeightRef = useRef(0)

  const [firstItem] = items

  if (firstItem?.width === undefined) {
    return null
  }

  if (firstItem.height === undefined) {
    return null
  }

  const scaleFactorForFirstItem =
    (containerWidth - 2 * containerPadding) / firstItem.width

  const firstItemHeight =
    firstItem.height * scaleFactorForFirstItem + itemMarginBottom

  const animationProps: Props = {
    firstItemHeight,
    isCopying,
    prevFirstItemHeight: prevFirstItemHeightRef.current,
  }

  prevFirstItemHeightRef.current = firstItemHeight

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
      >
        {items.map((item, index) => {
          const scaleFactor =
            (containerWidth - 2 * containerPadding) / (item.width ?? 1)

          const preview = getState().copy.previews[index]

          if (index === 0) {
            return null
          }

          return (
            <div
              key={items.length - index}
              style={{
                background: 'white',
                borderRadius: 4,
                boxShadow: '#00000033 0px 0px 6px 2px',
                height: (item.height ?? 0) * scaleFactor,
                marginBottom: itemMarginBottom,
                overflow: 'hidden',
                width: (item.width ?? 0) * scaleFactor,
              }}
            >
              <ScaledCopyItem
                html={preview ?? ''}
                width={item.width ?? 0}
                scaleFactor={String(scaleFactor)}
              />
            </div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
