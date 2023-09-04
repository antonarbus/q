import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowLayout } from './BoqRowLayout'
import { BoqRow } from './BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows } from 'client/entities/items'
import { onBoqRowDrag } from 'client/features/drag_boq_row'

interface Props {
  index: number
}

export const BoqRows = ({ index }: Props): JSX.Element => {
  const boqRows = useSelectorTyped(selectBoqRows({ index }), boqRowsShapeEqualityFn)

  // todo: draggable part should belong to "drag" feature
  return (
    <DraggableBoqRowsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={(): void => {
        onBoqRowDrag.start()
      }}
      onSortEnd={({ oldIndex, newIndex }): void => {
        onBoqRowDrag.end({ oldIndex, newIndex, index })
      }}
    >
      <AnimatePresence initial={false}>
        {boqRows.map((boqRow, rowIndex) => {
          if (boqRow.type === 'boq row') return (
            <BoqRowLayout
              key={boqRow.id}
              index={rowIndex} // internal prop consumed by SortableElement HOC
              // disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
              i={rowIndex}
              // itemHeight={item?.height ?? 0}
              rowId={boqRow.id}
            >
              <BoqRow index={index} rowIndex={rowIndex} boqRow={boqRow} />
            </BoqRowLayout>
          )
          return 'boq paste'
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
