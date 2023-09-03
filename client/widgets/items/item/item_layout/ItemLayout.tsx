import type { SortableElementProps } from 'react-sortable-hoc'
import type { ComponentClass, ReactNode } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'
import { ActionsContainer } from './ActionsContainer'
import { ResizablePaper } from './ResizablePaper'
import { className } from 'client/shared/className'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

interface Props {
  children: ReactNode
  itemHeight: number
  itemId: string
  itemActionElements?: ReactNode
  i: number
  disableResize?: boolean
  autoWidth?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
}

interface SortableItem extends SortableElementProps, Props { }

export const ItemLayout: ComponentClass<SortableItem> = SortableElement(({
  i,
  children,
  itemHeight,
  itemId,
  itemActionElements,
  disableResize,
  autoWidth,
  onItemResizeStop,
  onItemResize,
  onItemResizeStart,
}: Props) => {
  return (
    <motion.div
      id={itemId}
      className={className.item}
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      animate={{
        height: itemHeight, // height is being stored on copy/cut icon click
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
      <ActionsContainer itemActionElements={itemActionElements} />
      <ResizablePaper
        index={i}
        disableResize={disableResize}
        autoWidth={autoWidth}
        onItemResizeStop={onItemResizeStop}
        onItemResize={onItemResize}
        onItemResizeStart={onItemResizeStart}
      >
        {children}
      </ResizablePaper>
      <ActionsContainer /> {/* Right action container is used for symmetry, no icons inside */}
    </motion.div>
  )
})
