import { useSortable } from '@dnd-kit/sortable'
import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { useIsLastBlock } from '@entity/quotation/hook/useIsLastBlock'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { MdDragIndicator } from 'react-icons/md'

export const DragBlockIcon = (): JSX.Element => {
  const isLastBlock = useIsLastBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isLastBlock || isCopyModalVisible
  const block = useBlock()

  const sortable = useSortable({
    id: block.item.id,
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
          {...sortable.attributes}
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
