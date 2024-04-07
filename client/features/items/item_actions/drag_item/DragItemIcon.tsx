import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsItemSortDisabled } from '@entities/items'

const Handle = (): JSX.Element => {
  const isDisabled = useIsItemSortDisabled()

  return (
    <MdDragIndicator
      tabIndex={-1}
      style={{
        color: isDisabled ? '#acacac' : '#000',
        cursor: isDisabled ? 'default' : 'move',
      }}
    />
  )
}

export const DragItemIcon = SortableHandle(Handle)
