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
import { BlockAnimate } from './block_layout'
import { PasteBlockTextOverlay } from './paste_block_overlay_text'

type Props = {
  children: ReactNode
  disableResize?: boolean
  onBlockResizeStart?: OnBlockResizeStart
  onBlockResize?: OnBlockResize
  onBlockResizeStop?: OnBlockResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftBlockActionButtons?: ReactNode
  rightBlockActionButtons?: ReactNode
  className?: string
}

export const BlockComp = ({
  children,
  disableResize,
  onBlockResizeStart,
  onBlockResize,
  onBlockResizeStop,
  autoWidth,
  minWidth,
  leftBlockActionButtons,
  rightBlockActionButtons,
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
      <BlockAnimate
        disableResize={disableResize}
        autoWidth={autoWidth}
        minWidth={minWidth}
        blockHeight={block?.height ?? 0}
        id={block?.id ?? 'no id'}
        onItemResizeStart={onBlockResizeStart}
        onItemResize={onBlockResize}
        onItemResizeStop={onBlockResizeStop}
        leftItemActionButtons={leftBlockActionButtons}
        rightItemActionButtons={rightBlockActionButtons}
        className={className}
      >
        <PasteBlockTextOverlay>{children}</PasteBlockTextOverlay>
      </BlockAnimate>
    </div>
  )
}
