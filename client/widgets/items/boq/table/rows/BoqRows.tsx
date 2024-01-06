import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowSortAndAnimation } from './row/BoqRowSortAndAnimation'
import { BoqRow } from './row/BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows, RowProvider, useItem, itemsSlice } from 'client/entities/items'
import { onBoqRowDrag } from 'client/features/boq_row_actions/drag_boq_row'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { nanoid } from 'nanoid'
import { useIsBoqRowSortDisabled } from './useIsBoqRowSortDisabled'
import { dispatch } from 'client/shared/clients'
import { className } from 'client/shared/className'
import { hidePinsOnRowBlur } from 'client/features/pin'

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
                      hidePinsOnRowBlur({ e, itemIndex, rowIndex })
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
