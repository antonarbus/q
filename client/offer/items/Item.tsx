import { ActionsContainer } from './ActionsContainer'
import { CopyIcon } from './CopyIcon'
import { DraggableItem, DragHandle } from './draggable'
import { ResizablePaper } from './ResizablePaper'
import parseHtml from 'html-react-parser'
import { ItemType } from '../templateOffer'
import { useRef } from 'react'

type Props = {
  item: ItemType
  index: number
}

export const Item = ({ item, index }: Props) => {
  const itemRef = useRef()
  const itemHeight = itemRef?.current?.resizable?.clientHeight

  return (
    <DraggableItem index={index}>
      <ActionsContainer>
        <DragHandle />
        <CopyIcon itemToCopy={item} itemHeight={itemHeight}/>
      </ActionsContainer>
      <ResizablePaper key={item.id} id={item.id} width={item.width} index={index} itemRef={itemRef}>
        {item.type === 'text' && parseHtml(item.innerHtml)}
      </ResizablePaper>
    </DraggableItem>
  )
}
