import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { Draggable } from './draggable'
import { saveItemsOrder } from '../offerSlice'
import { arrayMoveImmutable } from 'array-move'
import { TextItem } from './TextItem'
import { PasteTextOnTopOrBottom } from './PasteTextOnTopOrBottom'
import { AnimatePresence } from 'framer-motion'
import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'

export const Items = () => {
  const dispatch = useDispatchTyped()
  const items = useSelectorTyped(state => state.offer.items)

  return (
    <Draggable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => {
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(saveItemsOrder({ sortedItems }))
        saveOfferIntoLocalStorage()
      }}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => {
          if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
          if (item.type === 'paste') return <PasteTextOnTopOrBottom key={item.id} />
          return null
        })}
      </AnimatePresence>
    </Draggable>
  )
}
