import type { SortableElementProps } from 'react-sortable-hoc'
import type { ComponentClass, ReactNode } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from '@shared/clients'

type Props = {
  children: ReactNode
}

type SortableItem = SortableElementProps & Props

export const BoqRowSortAndAnimation: ComponentClass<SortableItem> = SortableElement(({
  children,
}: Props) => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      animate={{
        height: 'auto', // height is being stored on copy/cut icon click
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        x: '150vw',
        overflow: 'hidden',
      }}
      transition={{
        duration: theme.item.animationDuration,
      }}
    >
      {children}
    </motion.div>
  )
})
