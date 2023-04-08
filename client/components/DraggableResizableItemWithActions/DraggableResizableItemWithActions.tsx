import { ActionsContainer } from 'client/components/DraggableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/components/DraggableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/components/DraggableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/components/DraggableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/features/copy/PasteTextInMiddle'
import { ResizablePaper } from 'client/components/DraggableResizableItemWithActions/ResizablePaper'
import { ItemType } from 'client/features/items/types'
import { Resizable } from 're-resizable'
import { DraggableItem } from './DraggableItem'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { useIsPasteHere } from './useIsPasteHere'
import { Msg } from './Msg'

type Props = {
  item: ItemType
  index: number
  children: React.ReactNode
  itemRef: React.MutableRefObject<Resizable>
  onClick?: (e: MouseEvent) => void
}

export const DraggableResizableItemWithActions = ({ item, index, children, itemRef, onClick }: Props) => {
  const isDisabled = useIsDisabledItem()
  const isPasteHere = useIsPasteHere({ index })

  return (
    <DraggableItem
      disabled={isDisabled}
      index={index}
      id={item.id}
    >
      <ActionsContainer>
        <DragIcon />
        <CopyIcon itemRef={itemRef} index={index} />
        <CutIcon itemRef={itemRef} index={index} />
        <DeleteIcon index={index} />
      </ActionsContainer>
      <ResizablePaper key={item.id} width={item.width} index={index} itemRef={itemRef} onClick={onClick}>
        <Msg index={index}/>
        <div style={{ opacity: isPasteHere ? 0.2 : 1 }}>
          {children}
        </div>
        <PasteTextInMiddle isPasteHereShown={isPasteHere}/>
      </ResizablePaper>
      <ActionsContainer/> {/* Right action container is used for symmetry, now it is empty, probably add there some icons later */}
    </DraggableItem>
  )
}
