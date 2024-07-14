import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsBlockSortDisabled, useBlock } from '@entities/quotation'

export const DragBlockIcon = (): JSX.Element => {
  const disabled = useIsBlockSortDisabled()
  const { id } = useBlock()

  const { listeners } = useSortable({
    id,
    disabled,
  })

  return (
    <MdDragIndicator
      {...listeners}
      className='drag-item-icon'
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'move',
      }}
    />
  )
}
