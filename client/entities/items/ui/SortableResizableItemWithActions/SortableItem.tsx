import type { SortableElementProps } from 'react-sortable-hoc';
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'
import type { RefDiv } from 'client/shared/types'
import { store } from 'client/app/store'
import type { ReactNode } from 'react';
import { useRef } from 'react'

interface IProps {
  children: ReactNode
  i: number // "index" is occupied internally by SortableElement
}

interface ISortableItem extends SortableElementProps {
  children: ReactNode
  i: number
}

export const SortableItem: React.ComponentClass<ISortableItem> =
  SortableElement(({ children, i }: IProps) => {
    const ref = useRef() as RefDiv
    const item = store.getState().items[i]

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
