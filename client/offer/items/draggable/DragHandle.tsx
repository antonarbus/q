import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/store'

const Handle = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)

  return (
    <span
      css={{
        cursor: isPasteMode ? 'default' : 'move'
      }}
    >
      <MdDragIndicator
        css={{
          color: isPasteMode ? '#acacac' : 'inherit'
        }}
      />
    </span>
  )
}

export const DragHandle = SortableHandle(Handle)
