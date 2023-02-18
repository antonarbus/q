import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { Draggable } from './draggable'
import { updateItemsOrder } from '../offerSlice'
// import { useLocalStorage } from 'react-use'
import { arrayMoveImmutable } from 'array-move'
import { TextItem } from './TextItem'
import { PasteInBetween } from './PasteInBetween'
import { AnimatePresence } from 'framer-motion'

export const Items = () => {
  const dispatch = useDispatchTyped()
  const { items } = useSelectorTyped(state => state.offer)

  return (
    <Draggable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => {
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(updateItemsOrder({ sortedItems }))
        localStorage.setItem('currentOffer', JSON.stringify(store.getState().offer))
      }}
    >
      <AnimatePresence>
        {items.map((item, index) => {
          if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
          if (item.type === 'paste') return <PasteInBetween key={item.id} />
          return null
        })}
      </AnimatePresence>
    </Draggable>
  )
}
