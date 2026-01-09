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
  onBlockResizeStart?: OnBlockResizeStart
  onBlockResize?: OnBlockResize
  onBlockResizeStop?: OnBlockResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftBlockActionButtons?: ReactNode
  rightBlockActionButtons?: ReactNode
  className?: string
}

export const BlockComp = (props: Props): JSX.Element => {
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
        autoWidth={props.autoWidth}
        blockHeight={block.item.height}
        className={props.className}
        id={block.item.id}
        leftItemActionButtons={props.leftBlockActionButtons}
        minWidth={props.minWidth}
        onItemResize={props.onBlockResize}
        onItemResizeStart={props.onBlockResizeStart}
        onItemResizeStop={props.onBlockResizeStop}
        rightItemActionButtons={props.rightBlockActionButtons}
      >
        <PasteBlockTextOverlay>{props.children}</PasteBlockTextOverlay>
      </BlockAnimate>
    </div>
  )
}
