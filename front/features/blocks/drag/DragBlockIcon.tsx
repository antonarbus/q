import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsBlockSortDisabled, useBlock } from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const DragBlockIcon = (): JSX.Element => {
  const disabled = useIsBlockSortDisabled()
  const { id } = useBlock()

  const { listeners } = useSortable({
    id,
    disabled,
  })

  return (
    <Tooltip
      title='drag'
      placement='left'
    >
      <span className={cls.actionIconContainer}>
        <MdDragIndicator
          {...listeners}
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            color: disabled ? '#acacac' : '#000',
            cursor: disabled ? 'default' : 'move',
          }}
        />
      </span>
    </Tooltip>
  )
}
