import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import type { ResizableProps } from 're-resizable'
import type { JSX, ReactNode } from 'react'
import { useBlock } from '../provider/BlockProvider'
import { BlockAnimate } from './block-layout'
import { PasteBlockTextOverlay } from './paste-block-overlay-text'

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
  const block = useBlock()

  const sortable = useSortable({
    id: block.item.id,
  })

  return (
    <div
      ref={sortable.setNodeRef}
      style={{
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        zIndex: sortable.isDragging === true ? 1000 : 0,
      }}
    >
      <BlockAnimate
        autoWidth={autoWidth}
        blockHeight={block.item.height}
        className={className}
        disableResize={disableResize}
        id={block.item.id}
        leftItemActionButtons={leftBlockActionButtons}
        minWidth={minWidth}
        onItemResize={onBlockResize}
        onItemResizeStart={onBlockResizeStart}
        onItemResizeStop={onBlockResizeStop}
        rightItemActionButtons={rightBlockActionButtons}
      >
        <PasteBlockTextOverlay>{children}</PasteBlockTextOverlay>
      </BlockAnimate>
    </div>
  )
}
