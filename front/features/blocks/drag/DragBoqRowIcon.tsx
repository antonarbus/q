import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsBoqRowSortDisabled, useRow } from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const DragBoqRowIcon = (): React.JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()
  const { row } = useRow()

  const { listeners } = useSortable({
    id: row.id,
    disabled,
  })

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='left'
      title='Drag'
    >
      <span className={cls.actionIconContainer}>
        <MdDragIndicator
          {...listeners}
          className={cls.actionIcon}
          style={{
            cursor: 'move',
            color: disabled === true ? '#acacac' : '#000',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
