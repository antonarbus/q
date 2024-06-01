import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { BoqRowAnimate } from '@widgets/items/boq/boq_table/rows/row/BoqRowAnimate'
import { BoqRowForEditModal } from '@widgets/items/boq/boq_table/rows/row/BoqRowForEditModal'
import { BoqItemForEditModal } from '@widgets/items/boq/BoqItemForEditModal'
import { PriceItemForEditModal } from '@widgets/items/price/PriceItemForEditModal'
import { TextItemForEditModal } from '@widgets/items/text/TextItemForEditModal'
import { hideBoqRowPinsOnRowBlur } from '@features/items/cell/pin'
import { onItemDrag } from '@features/items/drag'
import {
  ItemProvider,
  itemsShapeEqualityFn,
  BoqItemProvider,
  itemKey,
  DraggableItemsContainer,
  RowProvider,
  isFroalaSignal,
} from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'
import { cls } from '@shared/consts/cls'

export const BookmarkField = (): ReactNode => {
  const items = useSelectorTyped(
    (state) => state.quotation.items,
    itemsShapeEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  if (items.length === 0) return null

  const firstItem = items[0]

  if (firstItem === undefined) return null

  return (
    <BookmarkFieldLayout>
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
                <ItemProvider
                  key={item.id}
                  itemIndex={itemIndex}
                >
                  <TextItemForEditModal />
                </ItemProvider>
              )
            }

            if (item.type === itemKey.boq) {
              return (
                <ItemProvider
                  key={item.id}
                  itemIndex={itemIndex}
                >
                  <BoqItemProvider>
                    <BoqItemForEditModal />
                  </BoqItemProvider>
                </ItemProvider>
              )
            }

            if (item.type === itemKey.price) {
              return (
                <ItemProvider
                  key={item.id}
                  itemIndex={itemIndex}
                >
                  <PriceItemForEditModal />
                </ItemProvider>
              )
            }

            if (item.type === itemKey.row) {
              return (
                <ItemProvider
                  key={item.id}
                  itemIndex={itemIndex}
                >
                  <BoqItemProvider>
                    <RowProvider
                      rowIndex={0}
                      rowId={item.id}
                    >
                      <BoqRowAnimate>
                        <BoqRowForEditModal
                          onBlur={(e) => {
                            hideBoqRowPinsOnRowBlur({
                              e,
                              itemIndex,
                              rowIndex: 0,
                            })
                          }}
                        />
                      </BoqRowAnimate>
                    </RowProvider>
                  </BoqItemProvider>
                </ItemProvider>
              )
            }

            return null
          })}
        </AnimatePresence>
      </DraggableItemsContainer>
    </BookmarkFieldLayout>
  )
}

function BookmarkFieldLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <OutlinedDivWithLabel label='Item'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
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
    </OutlinedDivWithLabel>
  )
}
