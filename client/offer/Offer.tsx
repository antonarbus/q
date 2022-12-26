import { ResizablePaper } from './ResizablePaper'
import { store, useDispatchTyped, useSelectorTyped } from '@client/store'
import parseHtml from 'html-react-parser'
import { Draggable } from './draggable/Draggable'
import { DraggableItem } from './draggable/DraggableItem'
import { updateOrderAfterDrag } from './offerSlice'
import { useLocalStorage } from 'react-use'

export const Offer = () => {
  const [, setCurrentOfferAtLocalStorage] = useLocalStorage('currentOffer')
  const dispatch = useDispatchTyped()
  const { items } = useSelectorTyped(state => state.offer)
  const itemsArr = Object.values(items).sort((firstEl, secondEl) => firstEl.pos - secondEl.pos)

  return (
    <Draggable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => {
        const oldItemId = itemsArr.find(item => item.pos === oldIndex)?.id
        const newItemId = itemsArr.find(item => item.pos === newIndex)?.id
        dispatch(updateOrderAfterDrag({ oldItemId, oldIndex, newItemId, newIndex }))
        setCurrentOfferAtLocalStorage(store.getState().offer)
      }}
    >
      {itemsArr.map((item, index) => (
        <DraggableItem key={item.id} index={item.pos} >
          {item.type === 'text' && (
            <ResizablePaper key={item.id} id={item.id} savedWidth={item.width}>
              {parseHtml(item.innerHtml)}
            </ResizablePaper>
          )}
        </DraggableItem>
      ))}
    </Draggable>
  )
}
