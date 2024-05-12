import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDrag } from '@features/items/drag_item'
import { hideBoqRowPinsOnRowBlur } from '@features/items/pin'
import { ItemProvider, itemsShapeEqualityFn, BoqItemProvider, itemKey, DraggableItemsContainer, RowProvider } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { BoqRowForEditModal } from './boq/boq_table/rows/row/BoqRowForEditModal'
import { BoqRowSortAndAnimate } from './boq/boq_table/rows/row/BoqRowSortAndAnimate'
import { BoqItemForEditModal } from './boq/BoqItemForEditModal'
import { PriceItemForEditModal } from './price/PriceItemForEditModal'
import { TextItemForEditModal } from './text/TextItemForEditModal'

export const FirstItem = (): ReactNode => {
  const items = useSelectorTyped(state => state.quotation.items, itemsShapeEqualityFn)

  if (items.length === 0) return null

  const firstItem = items[0]!

  if (firstItem === undefined) return null

  return (
    <FirstItemLayout>
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
    </FirstItemLayout>
  )
}

function FirstItemLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '4px',
        border: '1px solid #ccc',
        background: 'white',
        ':hover': {
          border: '1px solid #333',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          left: 0,
          top: 0,
          transformOrigin: 'top left',
          translate: '7px -10px',
          scale: '0.75',
          color: 'rgba(0, 0, 0, 0.6)',
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: '1.4375em',
          letterSpacing: '0.00938em',
          userSelect: 'none',
          background: 'white',
          paddingInline: '8px',
        }}
      >
        Item
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          margin: '10px',
          padding: '10px',
          [`.${cls.items}`]: {
            maxWidth: 'none !important',
            padding: '10px !important',
            [`:has(.${cls.priceItem})`]: {
              display: 'block !important',
            },
            [`:has(.${cls.textItem})`]: {
              display: 'block !important',
            },
          },
          [`.${cls.item}`]: {
            marginBottom: '0px !important',
          },
          [`.${cls.item}.${cls.priceItem}`]: {
            display: 'block !important',
          },
          [`.${cls.item}.${cls.textItem}`]: {
            display: 'block !important',
          },
          '.boq-table-container .boq-rows .actions-container': {
            '.save-boq-row-icon, .open-info-boq-row-modal-icon': {
              display: 'none !important',
            },
          },
        }}
      >
        <Box
          sx={{
            width: '2000px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
