import parseHtml from 'html-react-parser'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'

type AnimationPropsType = {
  isCopying: boolean,
  fistItemHeight: number,
}

const variants: Variants = {
  initial: ({ isCopying, fistItemHeight }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: -fistItemHeight }
  },
  animate: ({ isCopying, fistItemHeight }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: itemMarginBottom, transition: { delay: 0, duration: 0.5, type: 'spring' } }
  },
  exit: ({ isCopying, fistItemHeight }: AnimationPropsType) => {
    if (isCopying) return {}
    return { y: -fistItemHeight, transition: { delay: 0, duration: 0.5, type: 'spring' } }
  },
}

let prevItemsLength = 0
let isCopying = true

export const RestOfCopiedItems = () => {
  const items = useSelectorTyped(state => state.copy.items)
  isCopying = items.length > prevItemsLength
  prevItemsLength = items.length

  if (!items.length) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

  const animationProps: AnimationPropsType = {
    isCopying,
    fistItemHeight: items[0].height * scaleFactorForFirstItem,
  }

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
                marginBottom: itemMarginBottom
              }}
            >
              <div
                css={{
                  background: 'white',
                  borderRadius: 6,
                  boxShadow: '#00000033 0px 0px 10px 0px',
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
