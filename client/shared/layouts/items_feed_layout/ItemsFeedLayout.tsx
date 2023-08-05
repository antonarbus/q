import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence, motion } from 'framer-motion'
import { saveItemsLocally } from 'client/shared/lib'
import { enterIntoCopyMode, exitFromCopyMode } from 'client/entities/copy'
import { reOrderItems } from 'client/entities/items'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import type { IProps } from './IProps'
import { DraggableItemsContainer } from './DraggableItemsContainer'

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
