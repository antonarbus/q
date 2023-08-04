import parseHtml from 'html-react-parser'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelectorTyped } from 'client/shared/hooks'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'
import { theme } from 'client/shared/clients'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'

interface AnimationPropsType {
  isCopying: boolean
  isSoleItem: boolean
}

const variants: Variants = {
  initial: ({ isCopying }: AnimationPropsType) => {
    if (isCopying) return { y: -500 }
    return {}
  },
  animate: ({ isCopying, isSoleItem }: AnimationPropsType) => {
    if (isCopying) {
      return {
        y: 0,
        transition: {
          delay: isSoleItem ? theme.copy.animationDuration : 0,
          duration: theme.copy.animationDuration,
          type: 'spring',
        },
      }
    }
    return {}
  },
  exit: ({ isCopying }: AnimationPropsType) => {
    if (!isCopying) {
      return {
        y: -500,
        transition: {
          delay: 0,
          duration: theme.copy.animationDuration,
          type: 'tween',
        },
      }
    }
    return {}
  },
}

export const FirstCopiedItem = (): JSX.Element | null => {
  const items = useSelectorTyped((state) => state.copy.items)
  const isCopying = useSelectorTyped((state) => state.copy.isCopying)

  const animationProps: AnimationPropsType = {
    isCopying,
    isSoleItem: items.length === 1,
  }

  const firstItem = items[0]
  if (!firstItem) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / firstItem.width

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
          height: firstItem.height * scaleFactorForFirstItem,
          width: firstItem.width * scaleFactorForFirstItem,
          marginTop: 15,
          marginBottom: itemMarginBottom,
          background: 'white',
          borderRadius: 4,
          boxShadow: '#00000033 0px 0px 6px 2px',
          overflow: 'hidden',
        }}
      >
        <div
          css={{
            width: firstItem.width,
            transformOrigin: 'left top',
            scale: `${scaleFactorForFirstItem}`,
          }}
        >
          {parseHtml(firstItem.previewHtml)}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
