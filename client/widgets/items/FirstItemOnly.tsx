import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDrag } from '@features/items/drag_item'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider, itemKey, DraggableItemsContainer } from '@entities/quotation'
import { BoqItem } from './boq/BoqItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

export const FirstItemOnly = (): ReactNode => {
  const items = useSelectorTyped(state => state.quotation.items, itemsShapeEqualityFn)
  if (items.length === 0) return null
  const firstItem = items[0]
  if (firstItem === undefined) return null

  return (
    <DraggableItemsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={onItemDrag.start}
      onSortEnd={({ oldIndex, newIndex }): void => {
        onItemDrag.end({ oldIndex, newIndex })
      }}
    >
      <AnimatePresence initial={false}>
        {[firstItem].map((item, itemIndex) => {
          if (item.type === itemKey.text) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <TextItem />
              </ItemProvider>
            )
          }

          if (item.type === itemKey.boq) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <BoqItem />
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          if (item.type === itemKey.price) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <TotalPriceItem />
              </ItemProvider>
            )
          }

          return null
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
