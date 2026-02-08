import { Draggable } from '@hello-pangea/dnd'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { useIsRowsSortDisabled } from '@entity/quotation/hook/useIsRowsSortDisabled'
import { DragHandleContext } from '@shared/lib/hello-pangea-dnd/DragHandleContext'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowSortable = (props: Props): JSX.Element => {
  const row = useRow()
  const isDragDisabled = useIsRowsSortDisabled()

  return (
    <Draggable
      draggableId={row.item.id}
      index={row.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              zIndex: snapshot.isDragging ? 1000 : 0,
            }}
          >
            <DragHandleContext.Provider value={provided.dragHandleProps}>
              {props.children}
            </DragHandleContext.Provider>
          </div>
        )
      }}
    </Draggable>
  )
}
