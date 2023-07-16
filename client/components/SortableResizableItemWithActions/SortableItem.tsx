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

export const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children, i }: TProps) => {
  const ref = useRef() as TRefDiv
  const item = store.getState().items?.[i]

  return (
    <motion.div
      ref={ref}
      id={item?.id}
      className='item'
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      animate={{
        height: item?.height, // height is stored on copy/cut icon click
        marginBottom: 20,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '150vw',
        overflow: 'hidden',
      }}
      transition={{
        duration: theme.item.animationDuration,
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  )
})
