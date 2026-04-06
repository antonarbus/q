import { Draggable } from '@hello-pangea/dnd'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@front/shared/lib/re-resizable/resizablePaper'
import { DragHandleContext } from '@front/shared/lib/hello-pangea-dnd/DragHandleContext'
import { useIsLastBlock } from '../hook/useIsLastBlock'
import type { ResizableProps } from 're-resizable'

import { useBlock } from '../provider/block/useBlock'
import { BlockAnimate } from './block-layout'
import { PasteBlockTextOverlay } from './paste-block-overlay-text'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useIsEditorView } from '../util/useIsEditorView'

type Props = {
  children: React.ReactNode
  onBlockResizeStart?: OnBlockResizeStart
  onBlockResize?: OnBlockResize
  onBlockResizeStop?: OnBlockResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftBlockActionButtons?: React.ReactNode
  rightBlockActionButtons?: React.ReactNode
  className?: string
  draggable?: boolean
  disableResize?: boolean
}

export const BlockComp = (props: Props): React.JSX.Element => {
  const block = useBlock()
  const isLastBlock = useIsLastBlock()
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)
  const isDragDisabled = isLastBlock || isCopyModalVisible
  const isEditorView = useIsEditorView()

  const blockContent = (
    <DragHandleContext.Provider value={null}>
      <BlockAnimate
        id={block.item.id}
        className={props.className}
        autoWidth={props.autoWidth}
        minWidth={props.minWidth}
        blockHeight={block.item.height}
        disableResize={props.disableResize}
        leftItemActionButtons={isEditorView && props.leftBlockActionButtons}
        rightItemActionButtons={isEditorView && props.rightBlockActionButtons}
        onItemResize={props.onBlockResize}
        onItemResizeStart={props.onBlockResizeStart}
        onItemResizeStop={props.onBlockResizeStop}
      >
        <PasteBlockTextOverlay>{props.children}</PasteBlockTextOverlay>
      </BlockAnimate>
    </DragHandleContext.Provider>
  )

  if (props.draggable === false) {
    return <div style={{ marginBottom: 20 }}>{blockContent}</div>
  }

  return (
    <Draggable draggableId={block.item.id} index={block.index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              marginBottom: 20,
              zIndex: snapshot.isDragging === true ? 1000 : 0,
            }}
          >
            <DragHandleContext.Provider value={provided.dragHandleProps}>
              <BlockAnimate
                id={block.item.id}
                className={props.className}
                autoWidth={props.autoWidth}
                minWidth={props.minWidth}
                blockHeight={block.item.height}
                disableResize={props.disableResize}
                leftItemActionButtons={isEditorView && props.leftBlockActionButtons}
                rightItemActionButtons={isEditorView && props.rightBlockActionButtons}
                onItemResize={props.onBlockResize}
                onItemResizeStart={props.onBlockResizeStart}
                onItemResizeStop={props.onBlockResizeStop}
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
