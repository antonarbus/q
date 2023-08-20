import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelectorTyped } from 'client/shared/hooks'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'
import { theme } from 'client/shared/clients'
import { ScaledCopyItem } from './ScaledCopyItem'

interface Props {
  isCopying: boolean
  isSoleItem: boolean
  height: number
}

const variants: Variants = {
  initial: ({ isCopying, height }: Props) => {
    if (isCopying) return {
      y: -height - 100,
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

export const FirstCopiedItem = (): JSX.Element | null => {
  const items = useSelectorTyped(state => state.copy.items)
  const isCopying = useSelectorTyped(state => state.copy.isCopying)

  const firstItem = items[0]
  if (!firstItem) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / firstItem.width
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
        css={{
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
          html={firstItem.previewHtml}
          width={firstItem.width}
          scaleFactor={`${scaleFactorForFirstItem}`}
        />
      </motion.div>
    </AnimatePresence>
  )
}
