import parseHtml from 'html-react-parser'
import { ActionsContainer } from './ActionsContainer'
import { CopyIcon } from './CopyIcon'
import { DraggableItem, DragHandle } from './draggable'
import { ResizablePaper } from './ResizablePaper'
import { ItemType } from '../templateOffer'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { PasteInHere } from './PasteInHere'

type Props = {
  item: ItemType
  index: number

}

export const TextItem = ({ item, index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const itemHeight = itemRef?.current?.resizable?.clientHeight || 0

  return (
    <DraggableItem index={index}>
      <ActionsContainer>
        <DragHandle />
        <CopyIcon itemToCopy={item} itemHeight={itemHeight} itemRef={itemRef}/>
      </ActionsContainer>
      {/* @ts-ignore */}
      <ResizablePaper key={item.id} width={item.width} index={index} itemRef={itemRef} id={item.id}>
        {parseHtml(item.innerHtml)}
        <PasteInHere id={item.id}/>
      </ResizablePaper>
      {/* Right action container is used for symmetry, later probably add there some icons */}
      <ActionsContainer/>
    </DraggableItem>
  )
}
