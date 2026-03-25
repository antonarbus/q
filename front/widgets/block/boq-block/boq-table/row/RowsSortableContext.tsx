import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import {
  onRowDragEnd,
  onRowDragStart,
} from '@front/features/blocks/drag-item/onRowDrag'

type Props = {
  children: React.ReactNode
}

export const RowsSortableContext = (props: Props): React.JSX.Element => {
  const block = useBlock()

  return (
    <DragDropContext
      onDragEnd={onRowDragEnd({ blockIndex: block.index })}
      onDragStart={onRowDragStart()}
    >
      <Droppable droppableId={`rows-${block.item.id}`}>
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
