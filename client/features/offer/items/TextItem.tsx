import parseHtml from 'html-react-parser'
import { ActionsContainer } from './ActionsContainer'
import { CopyIcon } from './CopyIcon'
import { DraggableItem, DragHandle } from './draggable'
import { ResizablePaper } from './ResizablePaper'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { PasteTextInMiddle } from './PasteTextInMiddle'
import { useSelectorTyped } from 'client/store'
import { DeleteIcon } from './DeleteIcon'
import { CutIcon } from './CutIcon'
import { ItemType } from '../types'
import { selectIsLastItem } from '../offerSlice'

type Props = {
  item: ItemType
  index: number
}

export const TextItem = ({ item, index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isPasteMode || isLastItem

  return (
    <DraggableItem
      disabled={isDisabled}
      index={index}
      id={item.id}
    >
      <ActionsContainer>
        <DragHandle />
        <CopyIcon itemToCopy={item} itemRef={itemRef} />
        <CutIcon itemToCut={item} itemRef={itemRef} />
        <DeleteIcon itemToDelete={item}/>
      </ActionsContainer>
      <ResizablePaper key={item.id} width={item.width} index={index} itemRef={itemRef}>
        {parseHtml(item.innerHtml)}
        <PasteTextInMiddle id={item.id}/>
      </ResizablePaper>
      <ActionsContainer/> {/* Right action container is used for symmetry, probably add there some icons later */}
    </DraggableItem>
  )
}
