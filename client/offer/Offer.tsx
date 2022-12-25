import { ResizablePaper } from './ResizablePaper'
import { useSelectorTyped } from '@client/store'
import parseHtml from 'html-react-parser'
import { Draggable } from './draggable/Draggable'
import { DraggableItem } from './draggable/DraggableItem'

export const Offer = () => {
  const { items } = useSelectorTyped(state => state.offer)
  const itemsArr = Object.values(items)

  return (
    <Draggable useDragHandle>
      {itemsArr.map((item, index) => {
        if (item.type === 'text') {
          return (
            <DraggableItem
              key={item.id}
              index={index}
            >
                <ResizablePaper key={item.id} id={item.id} savedWidth={item.width}>
                  {parseHtml(item.innerHtml)}
                </ResizablePaper>
            </DraggableItem>
          )
        }
        return null
      })}
    </Draggable>
  )
}
