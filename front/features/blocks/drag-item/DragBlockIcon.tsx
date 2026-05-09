import { useIsLastBlock } from '@front/entities/quotation/hook/useIsLastBlock'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { useDragHandleProps } from '@front/shared/lib/hello-pangea-dnd/DragHandleContext'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { MdDragIndicator } from 'react-icons/md'

export const DragBlockIcon = (): React.JSX.Element => {
  const isLastBlock = useIsLastBlock()

  const isCopyModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)

  const disabled = isLastBlock || isCopyModalVisible
  const dragHandleProps = useDragHandleProps()

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='left' title='Drag'>
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
