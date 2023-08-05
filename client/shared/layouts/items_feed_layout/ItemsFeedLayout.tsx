import { AnimatePresence } from 'framer-motion'
import { DraggableItemsContainer } from './DraggableItemsContainer'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import type { IProps } from './IProps'

export const ItemsFeedLayout = ({
  children,
  onItemDragStart,
  onItemDragEnd,
}: IProps): EmotionJSX.Element => {
  return (
    <DraggableItemsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={onItemDragStart}
      onSortEnd={({ oldIndex, newIndex }): void => {
        onItemDragEnd({ oldIndex, newIndex })
      }}
    >
      <AnimatePresence initial={false}>
        {children}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
