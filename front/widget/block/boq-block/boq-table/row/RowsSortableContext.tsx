import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { selectRows } from '@entity/quotation/redux/selector/selectRows'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import {
  onRowDragEnd,
  onRowDragStart,
} from '@feature/blocks/drag-row/onRowDrag'

type Props = {
  children: React.ReactNode
}

export const RowsSortableContext = (props: Props): React.JSX.Element => {
  const block = useBlock()

  const rows = useSelector(
    selectRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  const rowIds = rows.map((row) => row.id)

  return (
    <DragDropContext
      onDragEnd={onRowDragEnd({ blockIndex: block.index, rowIds })}
      onDragStart={onRowDragStart({ blockIndex: block.index })}
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
