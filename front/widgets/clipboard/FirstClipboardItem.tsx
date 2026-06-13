import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useState } from 'react'
import { containerPadding, containerWidth, itemMarginBottom } from './const'
import { ScaledClipboardItem } from './ScaledClipboardItem'

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

export const FirstClipboardItem = (): React.JSX.Element | null => {
  const items = reduxHolder.useSelector((state) => state.clipboard.items)
  const isCopying = reduxHolder.useSelector((state) => state.clipboard.isCopying)

  const firstItemPreviewHtml = reduxHolder.useSelector(
    (state) => state.clipboard.previews.at(0) ?? '',
  )

  const [firstItem] = items

  const scaleFactorForFirstItem =
    firstItem !== undefined && firstItem.width > 0
      ? (containerWidth - 2 * containerPadding) / firstItem.width
      : 1

  const [containerHeight, setContainerHeight] = useState(
    (firstItem?.height ?? 0) * scaleFactorForFirstItem,
  )

  if (firstItem?.width === undefined) {
    return null
  }

  const height = containerHeight
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
          overflow: 'hidden',
          borderRadius: '6px',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 6px 2px',
        }}
        variants={variants}
      >
        <ScaledClipboardItem
          html={firstItemPreviewHtml}
          scaleFactor={String(scaleFactorForFirstItem)}
          width={firstItem.width}
          onHeightChange={(height2) => {
            setContainerHeight(height2 * scaleFactorForFirstItem)
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
