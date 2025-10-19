import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { selectBoqRows } from '@entities/quotation/redux/selector/selectBoqRows'
import { onBoqRowDragEnd, onBoqRowDragStart } from '@features/blocks/drag'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowsSortableContext = ({ children }: Props): JSX.Element => {
  const block = useBlock()

  const boqRows = useSelector(
    selectBoqRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragEnd={onBoqRowDragEnd({ blockIndex: block.index, boqRowIds })}
      onDragStart={onBoqRowDragStart({ blockIndex: block.index })}
      sensors={sensors}
    >
      <SortableContext items={boqRowIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
