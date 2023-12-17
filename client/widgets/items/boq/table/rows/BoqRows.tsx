import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowSortAndAnimation } from './row/BoqRowSortAndAnimation'
import { BoqRow } from './row/BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows } from 'client/entities/items'
import { onBoqRowDrag } from 'client/features/boq_row_actions/drag_boq_row'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { nanoid } from 'nanoid'
import { useIsBoqRowSortDisabled } from './useIsBoqRowSortDisabled'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'

export const BoqRows = (): JSX.Element => {
  const { itemIndex } = useItemIndex()
  const boqRows = useSelectorTyped(selectBoqRows({ itemIndex }), boqRowsShapeEqualityFn)
  const isBoqRowSortDisabled = useIsBoqRowSortDisabled()

  return (
    <DraggableBoqRowsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={() => {
        onBoqRowDrag.start()
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        onBoqRowDrag.end({ oldIndex, newIndex, itemIndex })
      }}
    >
      <AnimatePresence initial={false}>
        {boqRows.map((boqRow, rowIndex) => {
          if (boqRow.type === 'boq row') {
            return (
              <BoqRowSortAndAnimation
                key={boqRow.id}
                index={rowIndex} // 'index' is internal prop consumed by SortableElement HOC
                i={rowIndex}
                disabled={isBoqRowSortDisabled}
                rowId={boqRow.id}
              >
                <BoqRow
                  rowIndex={rowIndex}
                  boqRow={boqRow}
                />
              </BoqRowSortAndAnimation>
            )
          }

          return <BoqPasteRowTextOverlay key={nanoid(3)} />
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
