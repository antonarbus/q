import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowLayout2 } from './row/BoqRowLayout2'
import { BoqRow } from './row/BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows } from 'client/entities/items'
import { onBoqRowDrag } from 'client/features/boq_row_actions/drag_boq_row'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { nanoid } from 'nanoid'

type Props = {
  itemIndex: number
}

export const BoqRows = ({ itemIndex }: Props): JSX.Element => {
  const boqRows = useSelectorTyped(selectBoqRows({ itemIndex }), boqRowsShapeEqualityFn)

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
              <BoqRowLayout2
                key={boqRow.id}
                index={rowIndex} // 'index' is internal prop consumed by SortableElement HOC
                i={rowIndex}
                rowId={boqRow.id}
              >
                <BoqRow
                  itemIndex={itemIndex}
                  rowIndex={rowIndex}
                  boqRow={boqRow}
                />
              </BoqRowLayout2>
            )
          }

          return <BoqPasteRowTextOverlay key={nanoid(3)} />
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
