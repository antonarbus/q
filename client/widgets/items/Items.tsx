import { useSelectorTyped } from 'client/shared/hooks'
import { onItemDrag } from 'client/features/item_actions/drag_item'
import { TextItem } from './text/TextItem'
import { PasteItem } from './paste/PasteItem'
import { AnimatePresence } from 'framer-motion'
import { DraggableItemsContainer } from '../../entities/items/ui/DraggableItemsContainer'
import { BoqItem } from './boq/BoqItem'
import { itemsShapeEqualityFn } from 'client/entities/items'

export const Items = (): JSX.Element => {
  const items = useSelectorTyped(state => state.items, itemsShapeEqualityFn)
  const shouldReRender = useSelectorTyped(state => state.offer.toggleOffer)

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
          const key = item.id + shouldReRender.toString()

          if (item.type === 'text') return <TextItem key={key} itemIndex={itemIndex} />
          if (item.type === 'boq') return <BoqItem key={key} itemIndex={itemIndex} />
          return <PasteItem key={key} />
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
