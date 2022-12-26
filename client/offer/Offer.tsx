import { ResizablePaper } from './ResizablePaper'
import { store, useDispatchTyped, useSelectorTyped } from '@client/store'
import parseHtml from 'html-react-parser'
import { Draggable, DraggableItem, DragHandle } from './draggable'
import { updateOrderAfterDrag } from './offerSlice'
import { useLocalStorage } from 'react-use'
import { arrayMoveImmutable } from 'array-move'

export const Offer = () => {
  const [, setCurrentOfferAtLocalStorage] = useLocalStorage('currentOffer')
  const dispatch = useDispatchTyped()
  const { items } = useSelectorTyped(state => state.offer)

  return (
    <Draggable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => {
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        console.log({ sortedItems })
        dispatch(updateOrderAfterDrag({ sortedItems }))
        setCurrentOfferAtLocalStorage(store.getState().offer)
      }}
    >
      {items.map((item, index) => (
        <DraggableItem key={item.id} index={index} >
          <DragHandle />
          <ResizablePaper key={item.id} id={item.id} width={item.width} index={index}>
            {item.type === 'text' && parseHtml(item.innerHtml)}
          </ResizablePaper>
        </DraggableItem>
      ))}
    </Draggable>
  )
}
