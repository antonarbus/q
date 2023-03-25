import { ActionsContainer } from 'client/components/DraggableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/components/DraggableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/components/DraggableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/components/DraggableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/features/copy/PasteTextInMiddle'
import { ResizablePaper } from 'client/components/DraggableResizableItemWithActions/ResizablePaper'
import { ItemType } from 'client/features/items/types'
import { Resizable } from 're-resizable'
import { useRef } from 'react'
import { DraggableItem } from './DraggableItem'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { useIsPasteHere } from './useIsPasteHere'

type Props = {
  item: ItemType,
  index: number,
  children: React.ReactNode
}

export const DraggableResizableItemWithActions = ({ item, index, children }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const isDisabled = useIsDisabledItem()
  const isPasteHere = useIsPasteHere({ itemId: item.id })

  return (
    <DraggableItem
      disabled={isDisabled}
      index={index}
      id={item.id}
    >
      <ActionsContainer>
        <DragIcon />
        <CopyIcon itemToCopy={item} itemRef={itemRef} />
        <CutIcon itemToCut={item} itemRef={itemRef} />
        <DeleteIcon itemToDelete={item}/>
      </ActionsContainer>
      <ResizablePaper key={item.id} width={item.width} index={index} itemRef={itemRef}>
        <div style={{ opacity: isPasteHere ? 0.2 : 1 }}>
          {children}
        </div>
        <PasteTextInMiddle isPasteHereShown={isPasteHere}/>
      </ResizablePaper>
      <ActionsContainer/> {/* Right action container is used for symmetry, probably add there some icons later */}
    </DraggableItem>
  )
}
