import { useSortable } from '@dnd-kit/sortable'
import { useIsBoqRowSortDisabled } from '@entities/quotation/hook/useIsBoqRowSortDisabled'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { MdDragIndicator } from 'react-icons/md'

export const DragBoqRowIcon = (): JSX.Element => {
  const disabled = useIsBoqRowSortDisabled()
  const row = useRow()

  const { listeners } = useSortable({
    id: row.item.id,
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
