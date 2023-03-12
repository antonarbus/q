import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { DraggableItems } from './draggable'
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
    <DraggableItems
      useDragHandle
      onSortStart={() => {
        document.body.style.cursor = 'move'
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(saveItemsOrder({ sortedItems }))
        saveOfferIntoLocalStorage()
        document.body.style.cursor = 'default'
      }}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => {
          if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
          if (item.type === 'paste') return <PasteTextOnTopOrBottom key={item.id} />
          return null
        }
        )}
      </AnimatePresence>
    </DraggableItems>
  )
}
