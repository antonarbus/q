import parseHtml from 'html-react-parser'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'

type AnimationPropsType = {
  isCopying: boolean,
  isSoleItem: boolean,
}

const variants: Variants = {
  initial: ({ isCopying }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: -500 }
  },
  animate: ({ isCopying, isSoleItem }: AnimationPropsType) => {
    if (!isCopying) return {}
    return { y: 0, transition: { delay: isSoleItem ? 0.5 : 0, duration: 0.5, type: 'spring' } }
  },
  exit: ({ isCopying }: AnimationPropsType) => {
    if (isCopying) return {}
    return { y: -500, transition: { delay: 0, duration: 0.5, type: 'tween' } }
  },
}

export const FirstCopiedItem = () => {
  const items = useSelectorTyped(state => state.copy.items)
  const isCopying = useSelectorTyped(state => state.copy.isCopying)

  const animationProps: AnimationPropsType = {
    isCopying,
    isSoleItem: items.length === 1
  }

  if (items.length === 0) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

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
          height: items[0].height * scaleFactorForFirstItem,
          width: items[0].width * scaleFactorForFirstItem,
          marginTop: 15,
          marginBottom: itemMarginBottom,
          background: 'white',
          borderRadius: 4,
          boxShadow: '#00000033 0px 0px 6px 2px',
        }}
      >
        <div
          className='fr-wrapper fr-element fr-view fr-box'
          css={{
            padding: 20,
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
