import type { SortableElementProps } from 'react-sortable-hoc'
import type { ComponentClass, ReactNode } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'
import { className } from 'client/shared/className'
import { PasteHere } from './paste_here_row'

type Props = {
  children: ReactNode
  i: number
  id: string
}

type SortableItem = SortableElementProps & Props

export const BoqRowLayout: ComponentClass<SortableItem> = SortableElement(({
  i,
  children,
  id,
}: Props) => {
  return (
    <motion.div
      id={id}
      className={className.boqRow}
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
      css={{
        // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '60px',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      <PasteHere id={id}>
        {children}
      </PasteHere>
    </motion.div>
  )
})
