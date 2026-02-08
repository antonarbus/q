import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { selectRows } from '@entity/quotation/redux/selector/selectRows'
import { onRowDragEnd, onRowDragStart } from '@feature/blocks/drag'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowsSortableContext = (props: Props): JSX.Element => {
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
