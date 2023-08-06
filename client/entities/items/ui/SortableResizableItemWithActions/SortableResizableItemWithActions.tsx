import { ActionsContainer } from 'client/entities/items/ui/SortableResizableItemWithActions/ActionsContainer'
import { CopyIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/CopyIcon'
import { CutIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/CutIcon'
import { DeleteIcon } from 'client/entities/items/ui/SortableResizableItemWithActions/DeleteIcon'
import { PasteTextInMiddle } from 'client/entities/items/ui/SortableResizableItemWithActions/PasteTextInMiddle'
import { ResizablePaper } from 'client/entities/items/ui/SortableResizableItemWithActions/ResizablePaper'
import { DragIcon } from './DragIcon'
import { useIsDisabledItem } from './useIsDisabledItem'
import { Msg } from './Msg'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'
import { ItemLayout } from 'client/shared/layouts'
import { store } from 'client/shared/clients'

interface IProps {
  index: number
  children: React.ReactNode
}

export const SortableResizableItemWithActions = ({
  index,
  children,
}: IProps): JSX.Element => {
  const disabled = useIsDisabledItem()
  const item = store.getState().items[index]

  return (
    <ItemLayout
      index={index}
      disabled={disabled}
      itemHeight={item?.height ?? 0}
      itemId={item?.id ?? 'no id'}
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
    </ItemLayout>
  )
}
