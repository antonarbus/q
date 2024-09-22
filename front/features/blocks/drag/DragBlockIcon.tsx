import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsLastBlock, useBlock } from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'
import { useRef, useState } from 'react'
import { dragTooltipTextSignal } from './dragTooltipTextSignal'
import { useIsCopyModalVisible } from '@entities/copy'

export const DragBlockIcon = (): React.JSX.Element => {
  const isLastBlock = useIsLastBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isLastBlock || isCopyModalVisible
  const { block } = useBlock()
  const { listeners, attributes, isDragging } = useSortable({
    id: block.id,
    disabled,
  })
  const [openTooltip, setOpenTooltip] = useState(false)
  const isOverDragIcon = useRef(false)

  return (
    <span
      className={cls.actionIconContainer}
      style={{ position: 'relative' }}
    >
      {/* if we wrap icon with tooltip dragging works strange, scroll is reset for no reason */}
      <Tooltip
        title={dragTooltipTextSignal.value}
        placement='left'
        enterDelay={500}
        enterNextDelay={500}
        open={openTooltip}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
          }}
        ></span>
      </Tooltip>
      <MdDragIndicator
        {...attributes}
        {...listeners}
        onPointerEnter={(event) => {
          isOverDragIcon.current = true
          setTimeout(() => {
            if (isOverDragIcon.current) {
              dragTooltipTextSignal.value = 'Drag'
              setOpenTooltip(true)
            }
          }, 500)
        }}
        onPointerLeave={(event) => {
          if (!isDragging) {
            setOpenTooltip(false)
            isOverDragIcon.current = false
          }
        }}
        onPointerMove={() => {
          if (isDragging && dragTooltipTextSignal.value === 'Drag') {
            dragTooltipTextSignal.value = 'Drop'
          }
        }}
        onPointerDown={(event) => {
          dragTooltipTextSignal.value = 'Drop'

          setTimeout(() => {
            listeners?.onPointerDown?.(event)
          })
        }}
        className={cls.actionIcon}
        tabIndex={-1}
        style={{
          color: disabled ? '#acacac' : '#000',
          cursor: disabled ? 'default' : 'move',
          touchAction: 'none',
        }}
      />
    </span>
  )
}
