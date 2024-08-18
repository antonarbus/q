import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { getState } from '@lib_instances/store'
import { onBlockDragEnd, onBlockDragStart } from '@features/blocks/drag'

type Props = {
  children: React.ReactNode
}

// example
// https://codesandbox.io/p/sandbox/dnd-kit-sortable-starter-template-22x1ix

export const BlocksSortableContext = ({ children }: Props): JSX.Element => {
  const blockIds = getState().quotation.blocks.map((block) => block.id)
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
