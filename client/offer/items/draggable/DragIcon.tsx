import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/store'

const Handle = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)

  return (
    <MdDragIndicator
      css={{
        color: isPasteMode ? '#acacac' : 'inherit',
        cursor: isPasteMode ? 'default' : 'move'
      }}
    />
  )
}

export const DragIcon = SortableHandle(Handle)
