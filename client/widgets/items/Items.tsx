import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { onItemDrag } from 'client/features/drag_item'
import { TextItem } from './TextItem'
import { PasteItem } from './PasteItem'
import { AnimatePresence } from 'framer-motion'
import { DraggableItemsContainer } from './DraggableItemsContainer'
import type { TItem } from 'client/shared/types'
import { allowToPaste } from 'client/entities/copy'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

// re-render the list only if item is replaced or new item is added
const equalityFn: EqualityFn = (prevItems: TItem[], currentItems: TItem[]): boolean => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: TItem, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = (): JSX.Element => {
  const items = useSelectorTyped(state => state.items, equalityFn)
  const shouldReRender = useSelectorTyped(state => state.offer.toggleOffer)
  const dispatch = useDispatchTyped()

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
        onExitComplete={(): void => {
          dispatch(allowToPaste())
        }}
      >
        {items.map((item, index) => {
          const key = item.id + shouldReRender.toString()

          if (item.type === 'text') return <TextItem key={key} index={index} />
          if (item.type === 'boq') return <div key={key}>boq</div>
          return <PasteItem key={key} />
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
