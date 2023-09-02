import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowLayout } from './BoqRowLayout'
import { BoqRow } from './BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows } from 'client/entities/items'

interface Props {
  index: number
}

export const BoqRows = ({ index }: Props): JSX.Element => {
  const boqRows = useSelectorTyped(selectBoqRows({ index }), boqRowsShapeEqualityFn)

  return (
    <DraggableBoqRowsContainer
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={(): void => {
        // onItemDrag.start
        console.log('boq row onSortStart')
      }}
      onSortEnd={({ oldIndex, newIndex }): void => {
        // onItemDrag.end({ oldIndex, newIndex })
        console.log('boq row onSortEnd')
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
