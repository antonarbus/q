import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { onItemDragEnd, onItemDragStart } from '@features/items/drag'
import { itemsShapeEqualityFn } from '@entities/quotation'

type Props = {
  children: React.ReactNode
}

export const ItemsSortableContext = ({ children }: Props): JSX.Element => {
  const items = useSelectorTyped(
    (state) => state.quotation.items,
    itemsShapeEqualityFn,
  )

  const itemIds = items.map((item) => item.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragStart={onItemDragStart}
      onDragEnd={onItemDragEnd({ itemIds })}
    >
      <SortableContext
        items={itemIds}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
