import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { boqRowsShapeEqualityFn } from 'client/entities/items/model/selectors/boqRowsShapeEqualityFn'
import { DraggableIBoqRowsContainer } from './DraggableIBoqRowsContainer'
import { BoqRowLayout } from './BoqRowLayout'
import { DragIcon } from 'client/features/drag_item'

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
    <DraggableIBoqRowsContainer
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
              boq row {rowIndex}
              <DragIcon />
            </BoqRowLayout>
          )
          return 'boq paste'
        })}
      </AnimatePresence>
    </DraggableIBoqRowsContainer >
  )
}
