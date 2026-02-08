import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { onBlockDragEnd, onBlockDragStart } from '@feature/blocks/drag'
import { getState } from '@shared/lib/redux'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BlocksSortableContext = (props: Props): JSX.Element => {
  const blockIds = getState().quotation.blocks.map((block) => block.id)

  return (
    <DragDropContext
      onDragEnd={onBlockDragEnd({ itemIds: blockIds })}
      onDragStart={onBlockDragStart}
    >
      <Droppable droppableId='blocks'>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.children}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}
