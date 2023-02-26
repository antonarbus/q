import parseHtml from 'html-react-parser'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'

const variants: Variants = {
  initial: (isCopying: boolean) => {
    if (!isCopying) return {}
    return { y: isCopying ? -500 : 0 }
  },
  animate: (isCopying: boolean) => {
    if (!isCopying) return {}
    return {
      y: 0,
      transition: {
        delay: 0,
        duration: 5.5,
        type: 'spring'
      }
    }
  },
  exit: (isCopying: boolean) => {
    if (isCopying) return {}
    return {
      y: -500,
      transition: {
        delay: 0,
        duration: 5.5,
        type: 'spring'
      }
    }
  },
}

let prevItemsLength = 0
let isCopying = true

export const FirstCopiedItem = () => {
  const items = useSelectorTyped(state => state.copy.items)
  isCopying = items.length > prevItemsLength
  prevItemsLength = items.length

  if (!items.length) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

  return (
    <AnimatePresence
      mode='wait'
      custom={isCopying}
    >
      <motion.div
        key={`last item number ${items.length}`}
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        custom={isCopying}
        css={{
          height: items[0].height * scaleFactorForFirstItem,
          width: items[0].width * scaleFactorForFirstItem,
          marginTop: 15,
          marginBottom: itemMarginBottom
        }}
      >
        <div
          css={{
            background: 'white',
            borderRadius: 6,
            boxShadow: '#00000033 0px 0px 12px 2px',
            padding: 20,
            marginBottom: 5,
            width: items[0].width,
            transformOrigin: 'left top',
            scale: `${scaleFactorForFirstItem}`,
          }}
        >
          {parseHtml(items[0].innerHtml)}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
