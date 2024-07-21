import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getState } from '@lib_instances/store'
import type { ResizableProps } from 're-resizable'
import type { ReactNode } from 'react'
import type {
  OnBlockResize,
  OnBlockResizeStop,
  OnBlockResizeStart,
} from '@shared/types/resizablePaper'
import { useBlock } from '../providers/BlockProvider'
import { PasteBlockTextOverlay } from './paste_block_overlay_text'
import { BookmarkAnimate } from './bookmark_layout'

type Props = {
  children: ReactNode
  disableResize?: boolean
  onBlockResizeStart?: OnBlockResizeStart
  onBlockResize?: OnBlockResize
  onBlockResizeStop?: OnBlockResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftItemActionButtons?: ReactNode
  rightItemActionButtons?: ReactNode
  className?: string
}

export const BookmarkComp = ({
  children,
  disableResize,
  onBlockResizeStart: onItemResizeStart,
  onBlockResize: onItemResize,
  onBlockResizeStop: onItemResizeStop,
  autoWidth,
  minWidth,
  leftItemActionButtons,
  rightItemActionButtons,
  className,
}: Props): JSX.Element => {
  const { blockIndex } = useBlock()
  const block = getState().quotation.blocks[blockIndex]
  const { id } = useBlock()

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : 0,
      }}
    >
      <BookmarkAnimate
        disableResize={disableResize}
        autoWidth={autoWidth}
        minWidth={minWidth}
        blockHeight={block?.height ?? 0}
        id={block?.id ?? 'no id'}
        onItemResizeStart={onItemResizeStart}
        onItemResize={onItemResize}
        onItemResizeStop={onItemResizeStop}
        leftItemActionButtons={leftItemActionButtons}
        rightItemActionButtons={rightItemActionButtons}
        className={className}
      >
        <PasteBlockTextOverlay>{children}</PasteBlockTextOverlay>
      </BookmarkAnimate>
    </div>
  )
}
