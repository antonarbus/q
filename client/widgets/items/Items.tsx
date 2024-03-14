import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDrag } from '@features/item_actions/drag_item'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider, itemType, reRenderItemsSignal } from '@entities/items'
import { DraggableItemsContainer } from '@entities/items/ui/DraggableItemsContainer'
import { BoqItem } from './boq/BoqItem'
import { PasteItem } from './paste/PasteItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

export const Items = (): ReactNode => {
  const items = useSelectorTyped(state => state.items, itemsShapeEqualityFn)

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
          const key = item.id + reRenderItemsSignal.value

          if (item.type === itemType.text) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <TextItem />
              </ItemProvider>
            )
          }

          if (item.type === itemType.boq) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <BoqItem />
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          if (item.type === itemType.price) {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <TotalPriceItem />
              </ItemProvider>
            )
          }

          if (item.type === itemType.paste) {
            return <PasteItem key={key} />
          }

          return null
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
