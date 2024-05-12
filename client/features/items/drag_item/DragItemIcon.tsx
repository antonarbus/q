import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsItemSortDisabled } from '@entities/quotation'

const Handle = (): JSX.Element => {
  const isDisabled = useIsItemSortDisabled()

  return (
    <MdDragIndicator
      className='drag-item-icon'
      tabIndex={-1}
      style={{
        color: isDisabled ? '#acacac' : '#000',
        cursor: isDisabled ? 'default' : 'move',
      }}
    />
  )
}

export const DragItemIcon = SortableHandle(Handle)
