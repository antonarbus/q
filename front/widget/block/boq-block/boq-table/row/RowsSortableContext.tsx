import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
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
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragEnd={onRowDragEnd({ blockIndex: block.index, rowIds })}
      onDragStart={onRowDragStart({ blockIndex: block.index })}
      sensors={sensors}
    >
      <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
        {props.children}
      </SortableContext>
    </DndContext>
  )
}
