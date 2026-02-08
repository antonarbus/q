import { useSortable } from '@dnd-kit/sortable'
import { useIsRowsSortDisabled } from '@entity/quotation/hook/useIsRowsSortDisabled'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { MdDragIndicator } from 'react-icons/md'

export const DragRowIcon = (): JSX.Element => {
  const disabled = useIsRowsSortDisabled()
  const row = useRow()

  const sortable = useSortable({
    id: row.item.id,
    disabled,
  })

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      open={sortable.isDragging ? false : undefined}
      placement='left'
      title='Drag'
      slotProps={{
        popper: {
          disablePortal: true,
        },
      }}
    >
      <span className={cls.actionIconContainer}>
        <MdDragIndicator
          {...sortable.listeners}
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            cursor: 'move',
            color: disabled === true ? '#acacac' : '#000',
          }}
        />
      </span>
    </Tooltip>
  )
}
