import parseHtml from 'html-react-parser'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'
import { theme } from 'client/theme'

type AnimationPropsType = {
  isCopying: boolean,
  firstItemHeight: number,
  prevFirstItemHeight: number,
}

const variants: Variants = {
  initial: ({ isCopying, firstItemHeight, prevFirstItemHeight }: AnimationPropsType) => {
    if (isCopying) {
      return {
        y: -firstItemHeight
      }
    }
    if (!isCopying) {
      console.log('🚀 initial ', { isCopying, firstItemHeight, prevFirstItemHeight })
      return {}
    }
    return {}
  },
  animate: ({ isCopying, firstItemHeight, prevFirstItemHeight }: AnimationPropsType) => {
    if (isCopying) {
      return {
        y: 0,
        transition: { delay: 0, duration: theme.copy.animationDuration, type: 'spring' }
      }
    }
    if (!isCopying) {
      console.log('🚀 animate ', { isCopying, firstItemHeight, prevFirstItemHeight })
      return {}
    }
    return {}
  },
  exit: ({ isCopying, firstItemHeight, prevFirstItemHeight }: AnimationPropsType) => {
    if (isCopying) {
      return {}
    }
    if (!isCopying) {
      console.log('🚀 exit ', { isCopying, firstItemHeight, prevFirstItemHeight })
      return {
        y: -prevFirstItemHeight,
        transition: { delay: 0, duration: theme.copy.animationDuration, type: 'spring' }
      }
    }
    return {}
  }
}

let prevFirstItemHeight = 0

export const RestOfCopiedItems = () => {
  const items = useSelectorTyped(state => state.copy.items)
  const isCopying = useSelectorTyped(state => state.copy.isCopying)

  if (items.length === 0) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width
  const firstItemHeight = items[0].height * scaleFactorForFirstItem + itemMarginBottom

  const scaleFactorForSecondItem = items.length > 1 ? (containerWidth - 2 * containerPadding) / items[1].width : 0
  const secondItemHeight = items.length > 1 ? items[1].height * scaleFactorForSecondItem + itemMarginBottom : 0

  const animationProps: AnimationPropsType = {
    isCopying,
    firstItemHeight,
    prevFirstItemHeight
  }

  prevFirstItemHeight = items[0].height * scaleFactorForFirstItem + itemMarginBottom
  // console.log('🚀 ~ file: RestOfCopiedItems.tsx:49 ~ RestOfCopiedItems ~ prevFirstItemHeight:', prevFirstItemHeight)

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
                overflow: 'hidden'
              }}
            >
              <div
                className='fr-wrapper fr-element fr-view fr-box'
                css={{
                  width: item.width,
                  transformOrigin: 'left top',
                  scale: `${scaleFactor}`,
                }}
              >
                {parseHtml(item.previewHtml)}
              </div>
            </div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
