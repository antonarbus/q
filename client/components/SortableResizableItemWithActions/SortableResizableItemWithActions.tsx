import { ActionsContainer } from 'client/components/SortableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/components/SortableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/components/SortableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/components/SortableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/components/SortableResizableItemWithActions/PasteTextInMiddle'
import { ResizablePaper } from 'client/components/SortableResizableItemWithActions/ResizablePaper'
import { SortableItem } from './SortableItem'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { Msg } from './Msg'
import { store } from 'client/store'
import { TChildren, TRefResizable } from 'client/types'
import { FixHeightForElementAnimation } from 'client/features/items/FixHeightForElementAnimation'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'

type Props = {
  index: number
  children: TChildren
  itemRef: TRefResizable
}

export const SortableResizableItemWithActions = ({ index, children, itemRef }: Props) => {
  const isDisabled = useIsDisabledItem()
  const item = store.getState().items?.[index]
  const height = item.height

  return (
    <SortableItem
      disabled={isDisabled}
      index={index}
      i={index} // "i", because "index" is internally reserved by SortableElement
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
    </SortableItem>
  )
}
