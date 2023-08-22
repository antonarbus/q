import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { onItemDrag } from 'client/features/drag_item'
import { TextItem } from './TextItem'
import { PasteItem } from './PasteItem'
import { AnimatePresence } from 'framer-motion'
import { DraggableItemsContainer } from './DraggableItemsContainer'
import { BoqItem } from './BoqItem/BoqItem'
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
      <AnimatePresence
        initial={false}
      // onExitComplete={(): void => {
      // }}
      >
        {items.map((item, index) => {
          const key = item.id + shouldReRender.toString()

          if (item.type === 'text') return <TextItem key={key} index={index} />
          if (item.type === 'boq') return <BoqItem key={key} index={index} />
          return <PasteItem key={key} />
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
