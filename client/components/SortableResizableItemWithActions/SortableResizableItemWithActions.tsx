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
import { TChildren } from 'client/types'
import { ReduceOpacityIfPasteHere } from './ReduceOpacityIfPasteHere'

type TProps = {
  index: number
  children: TChildren
}

// todo: idea!!! inside we render static html when isCopyMode = true
// todo: a bit later isCopyMode = false, it is swapped to {children}
// todo: in this case we do not have to do anything about heights
// todo: just animate height to auto

// todo: but we need to save html strings in items object on copy
// todo: FroalaForCopyMode will be no needed anymore
// todo: will be super elegant

// const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)

// if (isCopyMode) {
//   return (
//     <SortableResizableItemWithActions index={index} >
//       {parseHtml('<div>666</div>')}
//     </SortableResizableItemWithActions>
//   )
// }

export const SortableResizableItemWithActions = ({ index, children }: TProps) => {
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
          <Msg index={index}/>
          <ReduceOpacityIfPasteHere index={index}>
            {children}
          </ReduceOpacityIfPasteHere>
          <PasteTextInMiddle index={index}/>
        </ResizablePaper>
        <ActionsContainer/> {/* Right action container is used for symmetry, now it is empty, probably add there some icons later */}
    </SortableItem>
  )
}
