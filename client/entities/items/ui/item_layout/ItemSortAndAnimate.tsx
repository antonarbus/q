import type { SortableElementProps } from 'react-sortable-hoc'
import type { ComponentClass, ReactNode } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'
import { ItemActionsContainer } from './ItemActionsContainer'
import { ResizablePaper } from './ResizablePaper'
import { className } from 'client/shared/className'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

type Props = {
  children: ReactNode
  itemHeight: number
  itemId: string
  itemActionElements?: ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
}

type SortableItem = SortableElementProps & Props

export const ItemSortAndAnimate: ComponentClass<SortableItem> = SortableElement(({
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
      <ItemActionsContainer itemActionElements={itemActionElements} />
      <ResizablePaper
        disableResize={disableResize}
        autoWidth={autoWidth}
        onItemResizeStop={onItemResizeStop}
        onItemResize={onItemResize}
        onItemResizeStart={onItemResizeStart}
      >
        {children}
      </ResizablePaper>
      <ItemActionsContainer /> {/* Right action container is used for symmetry, no icons inside */}
    </motion.div>
  )
})
