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

type Props = {
  itemIndex: number
}

export const BoqRows = ({ itemIndex }: Props): JSX.Element => {
  const boqRows = useSelectorTyped(selectBoqRows({ itemIndex }), boqRowsShapeEqualityFn)
  const isBoqRowSortDisabled = useIsBoqRowSortDisabled({ itemIndex })

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
                  itemIndex={itemIndex}
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
