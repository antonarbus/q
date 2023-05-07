import { ActionsContainer } from 'client/components/DraggableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/components/DraggableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/components/DraggableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/components/DraggableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/components/DraggableResizableItemWithActions/PasteTextInMiddle'
import { ResizablePaper } from 'client/components/DraggableResizableItemWithActions/ResizablePaper'
import { DraggableItem } from './DraggableItem'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { Msg } from './Msg'
import { store } from 'client/store'
import { ChildrenType, RefResizableType } from 'client/types'
import { FixHeightForElementAnimation } from 'client/features/items/FixHeightForElementAnimation'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'

type Props = {
  index: number
  children: ChildrenType
  itemRef: RefResizableType
}

export const DraggableResizableItemWithActions = ({ index, children, itemRef }: Props) => {
  const isDisabled = useIsDisabledItem()
  const item = store.getState().items?.[index]
  const height = item.height

  return (
    <DraggableItem
      disabled={isDisabled}
      index={index}
      i={index}
    >
        <ActionsContainer>
          <DragIcon />
          <CopyIcon itemRef={itemRef} index={index} />
          <CutIcon itemRef={itemRef} index={index} />
          <DeleteIcon index={index} />
        </ActionsContainer>
        <ResizablePaper index={index} itemRef={itemRef}>
          <Msg index={index}/>
          <ReduceOpacityIfPasteHere index={index}>
            <FixHeightForElementAnimation height={height}>
              {children}
            </FixHeightForElementAnimation>
          </ReduceOpacityIfPasteHere>
          <PasteTextInMiddle index={index}/>
        </ResizablePaper>
        <ActionsContainer/> {/* Right action container is used for symmetry, now it is empty, probably add there some icons later */}
    </DraggableItem>
  )
}
