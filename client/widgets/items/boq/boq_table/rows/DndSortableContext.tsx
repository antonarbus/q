import {
  DndContext,
  MeasuringStrategy,
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
  useItem,
} from '@entities/quotation'

type Props = {
  children: React.ReactNode
}

export const DndSortableContext = ({ children }: Props): JSX.Element => {
  const { itemIndex } = useItem()

  const boqRows = useSelectorTyped(
    selectBoqRows({ itemIndex }),
    boqRowsShapeEqualityFn,
  )
  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onBoqRowDragStart({ itemIndex })}
      onDragEnd={onBoqRowDragEnd({ itemIndex, boqRowIds })}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
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
