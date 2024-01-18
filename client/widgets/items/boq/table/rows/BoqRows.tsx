import { useSelectorTyped } from '@libras/store'
import { AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'
import { onBoqRowDrag } from '@features/boq_row_actions/drag_boq_row'
import { hideBoqRowPinsOnRowBlur } from '@features/pin'
import { boqRowsShapeEqualityFn, selectBoqRows, RowProvider, useItem, useIsBoqRowSortDisabled } from '@entities/items'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowSortAndAnimation } from './row/BoqRowSortAndAnimation'

export const BoqRows = (): JSX.Element => {
  const { itemIndex } = useItem()
  const boqRows = useSelectorTyped(selectBoqRows({ itemIndex }), boqRowsShapeEqualityFn)
  const isBoqRowSortDisabled = useIsBoqRowSortDisabled()

  return (
    <DraggableBoqRowsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={() => {
        onBoqRowDrag.start({ itemIndex })
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        onBoqRowDrag.end({ oldIndex, newIndex, itemIndex })
      }}
    >
      <AnimatePresence initial={false}>
        {boqRows.map((boqRow, rowIndex) => {
          if (boqRow.type === 'boq row') {
            return (
              <RowProvider
                rowIndex={rowIndex}
                rowId={boqRow.id}
                key={boqRow.id}
              >
                <BoqRowSortAndAnimation
                  index={rowIndex} // 'index' is internal prop consumed by SortableElement HOC
                  disabled={isBoqRowSortDisabled}
                >
                  <BoqRow
                    onBlur={(e) => {
                      hideBoqRowPinsOnRowBlur({ e, itemIndex, rowIndex })
                    }}
                  />
                </BoqRowSortAndAnimation>
              </RowProvider>
            )
          }

          return <BoqPasteRowTextOverlay key={nanoid(3)} />
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
