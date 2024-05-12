import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDrag } from '@features/items/drag_item'
import { hideBoqRowPinsOnRowBlur } from '@features/items/pin'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider, itemKey, DraggableItemsContainer, RowProvider } from '@entities/quotation'
import { BoqRowForEditModal } from './boq/boq_table/rows/row/BoqRowForEditModal'
import { BoqRowSortAndAnimate } from './boq/boq_table/rows/row/BoqRowSortAndAnimate'
import { BoqItemForEditModal } from './boq/BoqItemForEditModal'
import { PriceItemForEditModal } from './price/PriceItemForEditModal'
import { TextItemForEditModal } from './text/TextItemForEditModal'

export const FirstItemOnly = (): ReactNode => {
  const items = useSelectorTyped(state => state.quotation.items, itemsShapeEqualityFn)

  if (items.length === 0) return null

  const firstItem = items[0]!

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
                <TextItemForEditModal />
              </ItemProvider>
            )
          }

          if (item.type === itemKey.boq) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <BoqItemForEditModal />
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          if (item.type === itemKey.price) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <PriceItemForEditModal />
              </ItemProvider>
            )
          }

          if (item.type === itemKey.row) {
            return (
              <ItemProvider key={item.id} itemIndex={itemIndex}>
                <BoqItemProvider>
                  <RowProvider
                    rowIndex={0}
                    rowId={item.id}
                  >
                    <BoqRowSortAndAnimate
                      index={0} // 'index' is internal prop consumed by SortableElement HOC
                      disabled={true}
                    >
                      <BoqRowForEditModal
                        onBlur={(e) => {
                          hideBoqRowPinsOnRowBlur({ e, itemIndex, rowIndex: 0 })
                        }}
                      />
                    </BoqRowSortAndAnimate>
                  </RowProvider>
                </BoqItemProvider>
              </ItemProvider>
            )
          }

          return null
        })}
      </AnimatePresence>
    </DraggableItemsContainer >
  )
}
