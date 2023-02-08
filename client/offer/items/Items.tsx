import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { Draggable } from './draggable'
import { updateOrderAfterDrag } from '../offerSlice'
import { useLocalStorage } from 'react-use'
import { arrayMoveImmutable } from 'array-move'
import { Item } from './Item'

export const Items = () => {
  const [, setCurrentOfferAtLocalStorage] = useLocalStorage('currentOffer')
  const dispatch = useDispatchTyped()
  const { items } = useSelectorTyped(state => state.offer)

  return (
    <Draggable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => {
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(updateOrderAfterDrag({ sortedItems }))
        setCurrentOfferAtLocalStorage(store.getState().offer)
      }}
    >
      {items.map((item, index) => {
        return (
          <Item key={item.id} item={item} index={index}/>
        )
      })}
    </Draggable>
  )
}
