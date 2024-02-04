import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'
import type { ComponentClass, ReactNode } from 'react'
import type { SortableElementProps } from 'react-sortable-hoc'
import { SortableElement } from 'react-sortable-hoc'
import { className } from '@shared/consts/className'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'
import { ItemActionsContainer } from './ItemActionsContainer'
import { ResizablePaper } from './ResizablePaper'

type Props = {
  children: ReactNode
  itemHeight: number
  itemId: string
  itemActionElements?: ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  onItemResizeStart?: OnItemResizeStart
  onItemResize?: OnItemResize
  onItemResizeStop?: OnItemResizeStop
}

type SortableItem = SortableElementProps & Props

export const ItemSortAndAnimate: ComponentClass<SortableItem> = SortableElement(({
  children,
  itemHeight,
  itemId,
  itemActionElements,
  disableResize,
  autoWidth,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
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
        onItemResizeStart={onItemResizeStart}
        onItemResize={onItemResize}
        onItemResizeStop={onItemResizeStop}
      >
        {children}
      </ResizablePaper>
      <ItemActionsContainer /> {/* Right action container is used for symmetry, no icons inside yet */}
    </motion.div>
  )
})
