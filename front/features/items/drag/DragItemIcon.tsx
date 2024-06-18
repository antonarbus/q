import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsItemSortDisabled, useItem } from '@entities/quotation'

export const DragItemIcon = (): JSX.Element => {
  const disabled = useIsItemSortDisabled()
  const { itemId } = useItem()

  const { listeners } = useSortable({
    id: itemId,
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
