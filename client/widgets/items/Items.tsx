import { useSelectorTyped } from 'client/shared/hooks'
import { onItemDrag } from 'client/features/item_actions/drag_item'
import { TextItem } from './text/TextItem'
import { PasteItem } from './paste/PasteItem'
import { AnimatePresence } from 'framer-motion'
import { DraggableItemsContainer } from 'client/entities/items/ui/DraggableItemsContainer'
import { BoqItem } from './boq/BoqItem'
import { itemsShapeEqualityFn } from 'client/entities/items'
import { ItemProvider } from './ItemProvider'

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
              <ItemProvider key={key} itemIndex={itemIndex} >
                <TextItem />
              </ItemProvider>
            )
          }

          if (item.type === 'boq') {
            return (
              <ItemProvider key={key} itemIndex={itemIndex} >
                <BoqItem />
              </ItemProvider>
            )
          }

          return <PasteItem key={key} />
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
