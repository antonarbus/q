import { Draggable } from '@hello-pangea/dnd'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { useIsRowsSortDisabled } from '@front/entities/quotation/hook/useIsRowsSortDisabled'
import { DragHandleContext } from '@front/shared/lib/hello-pangea-dnd/DragHandleContext'

type Props = {
  children: React.ReactNode
}

export const RowSortable = (props: Props): React.JSX.Element => {
  const row = useRow()
  const isDragDisabled = useIsRowsSortDisabled()

  return (
    <Draggable draggableId={row.item.id} index={row.index} isDragDisabled={isDragDisabled}>
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
