import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsBoqRowSortDisabled, useRow } from '@entities/quotation'

export const DragBoqRowIcon = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()
  const { id } = useRow()

  const { listeners } = useSortable({
    id,
    disabled,
  })

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
