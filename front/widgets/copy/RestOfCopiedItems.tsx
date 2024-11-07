import { getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@shared/theme'
import { type Variants, AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { containerPadding, containerWidth, itemMarginBottom } from './const'
import { ScaledCopyItem } from './ScaledCopyItem'

type Props = {
  isCopying: boolean
  firstItemHeight: number
  prevFirstItemHeight: number
}

const variants: Variants = {
  initial: ({ isCopying, firstItemHeight }: Props) => {
    if (isCopying) {
      return {
        y: -firstItemHeight,
      }
    }

    return {}
  },
  animate: ({ isCopying }: Props) => {
    if (isCopying) {
      return {
        y: 0,
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          // type: 'spring',
          ease: 'linear',
        },
      }
    }

    return {}
  },
  exit: ({ isCopying, prevFirstItemHeight }: Props) => {
    if (!isCopying) {
      return {
        y: -prevFirstItemHeight,
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          // type: 'spring',
          ease: 'linear',
        },
      }
    }

    return {}
  },
}

export const RestOfCopiedItems = (): React.JSX.Element | null => {
  const items = useSelectorTyped((state) => state.copy.items)
  const isCopying = useSelectorTyped((state) => state.copy.isCopying)
  const prevFirstItemHeightRef = useRef(0)

  const firstItem = items[0]

  if (!firstItem?.width) return null
  if (!firstItem.height) return null

  const scaleFactorForFirstItem =
    (containerWidth - 2 * containerPadding) / firstItem.width

  const firstItemHeight =
    firstItem.height * scaleFactorForFirstItem + itemMarginBottom

  const animationProps: Props = {
    isCopying,
    firstItemHeight,
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

          if (index === 0) return null

          return (
            <div
              key={items.length - index}
              style={{
                height: (item.height ?? 0) * scaleFactor,
                width: (item.width ?? 0) * scaleFactor,
                marginBottom: itemMarginBottom,
                background: 'white',
                borderRadius: 4,
                boxShadow: '#00000033 0px 0px 6px 2px',
                overflow: 'hidden',
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
