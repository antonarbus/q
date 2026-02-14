import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { useIsLastBlock } from '@entity/quotation/hook/useIsLastBlock'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { useDragHandleProps } from '@shared/lib/hello-pangea-dnd/DragHandleContext'
import { MdDragIndicator } from 'react-icons/md'

export const DragBlockIcon = (): React.JSX.Element => {
  const isLastBlock = useIsLastBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isLastBlock || isCopyModalVisible
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
