import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsBoqRowSortDisabled, useRow } from '@entities/quotation'

const Handle = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()
  const { rowId } = useRow()
  const { listeners } = useSortable({ id: rowId })

  return (
    <MdDragIndicator
      {...listeners}
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
