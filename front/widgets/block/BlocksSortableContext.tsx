import { onBlockDragEnd, onBlockDragStart } from '@front/features/blocks/drag-item/onBlockDrag'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

type Props = {
  children: React.ReactNode
}

export const BlocksSortableContext = (props: Props): React.JSX.Element => {
  return (
    <DragDropContext onDragEnd={onBlockDragEnd()} onDragStart={onBlockDragStart}>
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
