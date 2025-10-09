import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/type/resizablePaper'
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
  const { block } = useBlock()

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging === true ? 1000 : 0,
      }}
    >
      <BlockAnimate
        autoWidth={autoWidth}
        blockHeight={block.height ?? 0}
        className={className}
        disableResize={disableResize}
        id={block.id}
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
