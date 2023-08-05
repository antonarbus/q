import { ActionsContainer } from 'client/entities/items/ui/SortableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/entities/items/ui/SortableResizableItemWithActions/PasteTextInMiddle'
import { ResizablePaper } from 'client/entities/items/ui/SortableResizableItemWithActions/ResizablePaper'
import { SortableItem } from './SortableItem'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { Msg } from './Msg'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'

interface IProps {
  index: number
  children: React.ReactNode
}

export const SortableResizableItemWithActions = ({
  index,
  children,
}: IProps): JSX.Element => {
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
      <ActionsContainer /> {/* Right action container is used for symmetry, now it is empty, probably add there some icons later */}
    </SortableItem>
  )
}
