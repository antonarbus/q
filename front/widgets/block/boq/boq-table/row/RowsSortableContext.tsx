import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { selectRows } from '@entities/quotation/redux/selector/selectRows'
import { onRowDragEnd, onRowDragStart } from '@features/blocks/drag'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowsSortableContext = ({ children }: Props): JSX.Element => {
  const block = useBlock()

  const boqRows = useSelector(
    selectRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragEnd={onRowDragEnd({ blockIndex: block.index, boqRowIds })}
      onDragStart={onRowDragStart({ blockIndex: block.index })}
      sensors={sensors}
    >
      <SortableContext items={boqRowIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
