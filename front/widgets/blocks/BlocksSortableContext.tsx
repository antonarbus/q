import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { onBlockDragEnd, onBlockDragStart } from '@features/blocks/drag'
import { arrayShapesEqualityFn } from '@shared/lib/redux/arrayShapesEqualityFn'

type Props = {
  children: React.ReactNode
}

// example
// https://codesandbox.io/p/sandbox/dnd-kit-sortable-starter-template-22x1ix

export const BlocksSortableContext = ({ children }: Props): JSX.Element => {
  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  const blockIds = blocks.map((block) => block.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{ layoutShiftCompensation: false }}
      collisionDetection={closestCenter}
      onDragStart={onBlockDragStart}
      onDragEnd={onBlockDragEnd({ itemIds: blockIds })}
    >
      <SortableContext
        items={blockIds}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
