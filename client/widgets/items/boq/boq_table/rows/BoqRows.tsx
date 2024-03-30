import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { onBoqRowDrag } from '@features/items/boq_row_actions/drag_boq_row'
import { hideBoqRowPinsOnRowBlur } from '@features/items/pin'
import { boqRowsShapeEqualityFn, selectBoqRows, RowProvider, useItem, useIsBoqRowSortDisabled, boqRowType } from '@entities/items'
import { nanoid } from '@shared/lib/nanoid'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowSortAndAnimate } from './row/BoqRowSortAndAnimate'

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
          if (boqRow.type === boqRowType.row) {
            return (
              <RowProvider
                rowIndex={rowIndex}
                rowId={boqRow.id}
                key={boqRow.id}
              >
                <BoqRowSortAndAnimate
                  index={rowIndex} // 'index' is internal prop consumed by SortableElement HOC
                  disabled={isBoqRowSortDisabled}
                >
                  <BoqRow
                    onBlur={(e) => {
                      hideBoqRowPinsOnRowBlur({ e, itemIndex, rowIndex })
                    }}
                  />
                </BoqRowSortAndAnimate>
              </RowProvider>
            )
          }

          if (boqRow.type === boqRowType.paste) {
            return <BoqPasteRowTextOverlay key={nanoid(3)} />
          }

          return null
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
