import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsBoqRowSortDisabled } from '@entities/quotation'

const Handle = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()

  return (
    <MdDragIndicator
      className='drag-boq-row-icon'
      tabIndex={-1}
      style={{
        cursor: 'move',
        color: disabled ? '#acacac' : '#000',
      }}
    />
  )
}

export const DragBoqRowIcon = SortableHandle(Handle)
