import { Draggable } from '@hello-pangea/dnd'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import { DragHandleContext } from '@shared/lib/hello-pangea-dnd/DragHandleContext'
import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { useIsLastBlock } from '../hook/useIsLastBlock'
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
  const isLastBlock = useIsLastBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const isDragDisabled = isLastBlock || isCopyModalVisible

  return (
    <Draggable
      draggableId={block.item.id}
      index={block.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              marginBottom: 20,
              zIndex: snapshot.isDragging ? 1000 : 0,
            }}
          >
            <DragHandleContext.Provider value={provided.dragHandleProps}>
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
            </DragHandleContext.Provider>
          </div>
        )
      }}
    </Draggable>
  )
}
