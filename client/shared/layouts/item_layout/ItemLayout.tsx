import type { SortableElementProps } from 'react-sortable-hoc'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'
import type { ComponentClass, ReactNode } from 'react'
import { useRef } from 'react'

interface IProps {
  children: ReactNode
  itemHeight: number
  itemId: string
}

interface ISortableItem extends SortableElementProps {
  children: ReactNode
  itemHeight: number
  itemId: string
}

export const ItemLayout: ComponentClass<ISortableItem> =
  SortableElement(({ children, itemHeight, itemId }: IProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    return (
      <motion.div
        ref={itemRef}
        id={itemId}
        className='item'
        initial={{
          height: 0,
          marginBottom: 0,
          opacity: 0,
          y: '100vh',
          overflow: 'hidden',
        }}
        animate={{
          height: itemHeight, // height is stored on copy/cut icon click
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
