import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { boqRowsShapeEqualityFn } from 'client/entities/items/model/selectors/boqRowsShapeEqualityFn'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowLayout } from './BoqRowLayout'
import { BoqRow } from './BoqRow'

interface Props {
  index: number
}

export const BoqRows = ({ index }: Props): JSX.Element => {

  const boqRows = useSelectorTyped(state => {
    const item = state.items[index]
    if (item?.type !== 'boq') return []
    return item.boq.rows
  }, boqRowsShapeEqualityFn)

  console.log('🚀  boqRows:', boqRows)

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
