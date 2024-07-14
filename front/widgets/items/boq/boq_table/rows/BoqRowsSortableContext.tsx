import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { onBoqRowDragEnd, onBoqRowDragStart } from '@features/items/drag'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  useBlock,
} from '@entities/quotation'

type Props = {
  children: React.ReactNode
}

export const BoqRowsSortableContext = ({ children }: Props): JSX.Element => {
  const { blockIndex } = useBlock()

  const boqRows = useSelectorTyped(
    selectBoqRows({ blockIndex }),
    boqRowsShapeEqualityFn,
  )
  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragStart={onBoqRowDragStart({ blockIndex })}
      onDragEnd={onBoqRowDragEnd({ blockIndex, boqRowIds })}
    >
      <SortableContext
        items={boqRowIds}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
