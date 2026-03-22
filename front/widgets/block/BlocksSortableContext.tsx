import {
  onBlockDragEnd,
  onBlockDragStart,
} from '@front/features/blocks/drag-item/onBlockDrag'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { getState } from '@front/shared/lib/redux'

type Props = {
  children: React.ReactNode
}

export const BlocksSortableContext = (props: Props): React.JSX.Element => {
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
