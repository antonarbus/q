import { useSortable } from '@dnd-kit/sortable'
import { MdDragIndicator } from 'react-icons/md'
import { useIsBlockSortDisabled, useBlock } from '@entities/quotation'
// import { } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const DragBlockIcon = (): JSX.Element => {
  const disabled = useIsBlockSortDisabled()
  const { block } = useBlock()
  const { listeners } = useSortable({ id: block.id, disabled })

  return (
    // todo: if drag icon is wrapped with tooltip sorting starts to behave strange, scroll is reset on click
    // todo: think about controlled tooltip for some shadow element, don't know :(
    // <Tooltip
    //   title='drag'
    //   placement='left'
    //   enterDelay={500}
    //   enterNextDelay={500}
    // >
    //   <span className={cls.actionIconContainer}>
    <MdDragIndicator
      {...listeners}
      className={cls.actionIcon}
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'move',
        touchAction: 'none',
      }}
    />
    //   </span>
    // </Tooltip>
  )
}
