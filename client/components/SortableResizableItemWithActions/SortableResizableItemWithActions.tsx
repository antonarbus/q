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
import { Children } from 'client/types'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'

type Props = {
  index: number
  children: Children
}

export const SortableResizableItemWithActions = ({
  index,
  children,
}: Props) => {
  const isDisabled = useIsDisabledItem()

  return (
    <SortableItem
      disabled={isDisabled}
      index={index}
      i={index} // "i", because "index" is internally reserved by SortableElement
    >
      <ActionsContainer>
        <DragIcon />
        <CopyIcon index={index} />
        <CutIcon index={index} />
        <DeleteIcon index={index} />
      </ActionsContainer>
      <ResizablePaper index={index}>
        <Msg index={index} />
        <ReduceOpacityIfPasteHere index={index}>
          {children}
        </ReduceOpacityIfPasteHere>
        <PasteTextInMiddle index={index} />
      </ResizablePaper>
      <ActionsContainer />{' '}
      {/* Right action container is used for symmetry, now it is empty, probably add there some icons later */}
    </SortableItem>
  )
}
