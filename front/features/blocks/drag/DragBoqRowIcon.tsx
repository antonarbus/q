import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import {
  isDraggingSignal,
  useIsBoqRowSortDisabled,
  useRow,
} from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const DragBoqRowIcon = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()
  const { id } = useRow()

  const { listeners } = useSortable({
    id,
    disabled,
  })

  return (
    <Tooltip
      title='drag'
      placement='left'
      disableHoverListener={isDraggingSignal.value}
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdDragIndicator
          {...listeners}
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            cursor: 'move',
            color: disabled ? '#acacac' : '#000',
          }}
        />
      </span>
    </Tooltip>
  )
}
