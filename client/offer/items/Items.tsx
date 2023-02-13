import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { Draggable } from './draggable'
import { updateOrderAfterDrag } from '../offerSlice'
import { useLocalStorage } from 'react-use'
import { arrayMoveImmutable } from 'array-move'
import { TextItem } from './TextItem'
import { PasteItem } from './PasteItem'

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
        if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
        if (item.type === 'paste') return <PasteItem key={item.id}/>
        return null
      })}
    </Draggable>
  )
}
