import { useSelectorTyped } from '@libras/store'
import { AnimatePresence } from 'framer-motion'
import { onItemDrag } from '@features/item_actions/drag_item'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider } from '@entities/items'
import { DraggableItemsContainer } from '@entities/items/ui/DraggableItemsContainer'
import { BoqItem } from './boq/BoqItem'
import { PasteItem } from './paste/PasteItem'
import { TextItem } from './text/TextItem'

export const Items = (): JSX.Element => {
  const items = useSelectorTyped(state => state.items, itemsShapeEqualityFn)
  const reRenderOffer = useSelectorTyped(state => state.app.reRenderOffer)

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
          const key = item.id + reRenderOffer.toString()

          if (item.type === 'text') {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <TextItem />
              </ItemProvider>
            )
          }

          if (item.type === 'boq') {
            return (
              <ItemProvider key={key} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <BoqItem />
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          return <PasteItem key={key} />
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
