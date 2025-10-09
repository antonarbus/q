import {
  closestCenter,
  DndContext,
  PointerSensor,
  // pointerWithin, // bad for large elements
  // closestCorners, // bad for large elements
  // rectIntersection, // bad for large elements
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { onBlockDragEnd, onBlockDragStart } from '@features/blocks/drag'
import { getState } from '@shared/lib/redux'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// example
// https://codesandbox.io/p/sandbox/dnd-kit-sortable-starter-template-22x1ix

export const BlocksSortableContext = ({ children }: Props): JSX.Element => {
  const blockIds = getState().quotation.blocks.map((block) => block.id)
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragEnd={onBlockDragEnd({ itemIds: blockIds })}
      onDragStart={onBlockDragStart}
      sensors={sensors}
    >
      <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
