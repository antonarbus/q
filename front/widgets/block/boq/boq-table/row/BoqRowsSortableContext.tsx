import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelector } from '@shared/lib/redux'
import { onBoqRowDragEnd, onBoqRowDragStart } from '@features/blocks/drag'
import { selectBoqRows, useBlock } from '@entities/quotation'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowsSortableContext = ({ children }: Props): JSX.Element => {
  const { blockIndex } = useBlock()

  const boqRows = useSelector(
    selectBoqRows({ blockIndex }),
    arrayShapesEqualityFn,
  )

  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragEnd={onBoqRowDragEnd({ blockIndex, boqRowIds })}
      onDragStart={onBoqRowDragStart({ blockIndex })}
      sensors={sensors}
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
