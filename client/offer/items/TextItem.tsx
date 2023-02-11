import parseHtml from 'html-react-parser'
import { ActionsContainer } from './ActionsContainer'
import { CopyIcon } from './CopyIcon'
import { DraggableItem, DragHandle } from './draggable'
import { ResizablePaper } from './ResizablePaper'
import { ItemType } from '../templateOffer'
import { useRef } from 'react'
import { Resizable } from 're-resizable'

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
        <CopyIcon itemToCopy={item} itemHeight={itemHeight}/>
      </ActionsContainer>
      <ResizablePaper key={item.id} width={item.width} index={index} itemRef={itemRef}>
        {parseHtml(item.innerHtml)}
      </ResizablePaper>
    </DraggableItem>
  )
}
