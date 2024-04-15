import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDrag } from '@features/items/item_actions/drag_item'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider, itemKey, DraggableItemsContainer } from '@entities/quotation'
import { BoqItem } from './boq/BoqItem'
import { PasteItem } from './paste/PasteItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

export const Items = (): ReactNode => {
  const items = useSelectorTyped(state => state.quotation, itemsShapeEqualityFn)

  if (items.length === 0) return null

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
        {items.map((item, itemIndex) => {
          const key = item.id

          if (item.type === itemKey.text) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <TextItem />
              </ItemProvider>
            )
          }

          if (item.type === itemKey.boq) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <BoqItem />
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          if (item.type === itemKey.price) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <TotalPriceItem />
              </ItemProvider>
            )
          }

          if (item.type === itemKey.paste) {
            return <PasteItem key={key} />
          }

          return null
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
