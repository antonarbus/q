import { useIsRowsSortDisabled } from '@entity/quotation/hook/useIsRowsSortDisabled'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { useDragHandleProps } from '@shared/lib/hello-pangea-dnd/DragHandleContext'
import type { JSX } from 'react'
import { MdDragIndicator } from 'react-icons/md'

export const DragRowIcon = (): JSX.Element => {
  const disabled = useIsRowsSortDisabled()
  const dragHandleProps = useDragHandleProps()

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='left'
      title='Drag'
    >
      <span className={cls.actionIconContainer} {...dragHandleProps}>
        <MdDragIndicator
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            cursor: disabled === true ? 'default' : 'move',
            color: disabled === true ? '#acacac' : '#000',
          }}
        />
      </span>
    </Tooltip>
  )
}
