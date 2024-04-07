import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsBoqRowSortDisabled } from '@entities/items/hooks/useIsBoqRowSortDisabled'

const Handle = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()

  return (
    <MdDragIndicator
      style={{
        cursor: 'move',
        color: disabled ? '#acacac' : '#000',
      }}
    />
  )
}

export const DragBoqRow = SortableHandle(Handle)
