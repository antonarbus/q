import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/theme'
import { TChildren, TRefDiv } from 'client/types'
import { store } from 'client/store'
import { useRef } from 'react'

type TProps = {
  children: TChildren
  i: number // "index" is occupied internally by SortableElement
}

interface ISortableItem extends SortableElementProps {
  children: TChildren
  i: number
}

type TAnimatedProps = {
  height: number | string
  marginBottom: number | string
  opacity: number | string
  y: number | string
}

export const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children, i }: TProps) => {
  const ref = useRef() as TRefDiv
  const id = store.getState().items?.[i]?.id

  return (
    <motion.div
      ref={ref}
      id={id}
      className='item'
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh',
      }}
      animate={{
        height: 'auto',
        marginBottom: 20,
        opacity: 1,
        y: 0,
      }}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '150vw',
      }}
      transition={{
        duration: theme.item.animationDuration
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
      onAnimationStart={(animatedProps: TAnimatedProps) => {
        if (animatedProps.height !== 0) return // otherwise shadows are trimmed on initial load
        ref.current.style.overflow = 'hidden'
      }}
      onAnimationComplete={() => {
        ref.current.style.removeProperty('overflow')
      }}
    >
      {children}
    </motion.div>
  )
})
