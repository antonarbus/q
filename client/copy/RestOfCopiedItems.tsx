import parseHtml from 'html-react-parser'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'

type AnimationPropsType = {
  isCopying: boolean,
  prevFirstItemHeight: number,
}

const variants: Variants = {
  initial: ({ isCopying, prevFirstItemHeight }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: -prevFirstItemHeight }
  },
  animate: ({ isCopying }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: 0, transition: { delay: 0, duration: 0.5, type: 'spring' } }
  },
  exit: ({ isCopying, prevFirstItemHeight }: AnimationPropsType) => {
    if (isCopying) return {}
    return { y: -prevFirstItemHeight, transition: { delay: 0, duration: 0.5, type: 'spring' } }
  },
}

let prevFirstItemHeight = 0

export const RestOfCopiedItems = () => {
  const items = useSelectorTyped(state => state.copy.items)
  const isCopying = useSelectorTyped(state => state.copy.isCopying)

  if (items.length === 0) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

  const animationProps: AnimationPropsType = {
    isCopying,
    prevFirstItemHeight,
  }

  prevFirstItemHeight = items[0].height * scaleFactorForFirstItem + itemMarginBottom

  return (
    <AnimatePresence
      mode='wait'
      custom={animationProps}
    >
      <motion.div
        key={`unique key for rest of items is the array.length = ${items.length}`}
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
                boxShadow: '#00000033 0px 0px 12px 2px',
              }}
            >
              <div
                css={{
                  padding: 20,
                  width: item.width,
                  transformOrigin: 'left top',
                  scale: `${scaleFactor}`,
                }}
              >
                {parseHtml(item.innerHtml)}
              </div>
            </div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
