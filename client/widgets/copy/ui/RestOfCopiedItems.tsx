import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelectorTyped } from 'client/shared/hooks'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'
import { getState, theme } from 'client/shared/clients'
import { ScaledCopyItem } from './ScaledCopyItem'
import { useRef } from 'react'

interface Props {
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

export const RestOfCopiedItems = (): JSX.Element | null => {
  const items = useSelectorTyped(state => state.copy.items)
  const previews = useSelectorTyped(state => state.copy.previews)
  const isCopying = useSelectorTyped(state => state.copy.isCopying)
  const prevFirstItemHeightRef = useRef(0)

  const firstItem = items[0]
  if (!firstItem) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / firstItem.width
  const firstItemHeight = firstItem.height * scaleFactorForFirstItem + itemMarginBottom

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
          const scaleFactor = (containerWidth - 2 * containerPadding) / item.width
          const preview = getState().copy.previews[index]

          if (index === 0) return null

          return (
            <div
              key={items.length - index}
              css={{
                height: item.height * scaleFactor,
                width: item.width * scaleFactor,
                marginBottom: itemMarginBottom,
                background: 'white',
                borderRadius: 4,
                boxShadow: '#00000033 0px 0px 6px 2px',
                overflow: 'hidden',
              }}
            >
              <ScaledCopyItem
                html={preview ?? ''}
                width={item.width}
                scaleFactor={`${scaleFactor}`}
              />
            </div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
