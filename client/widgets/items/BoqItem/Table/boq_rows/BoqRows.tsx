import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence } from 'framer-motion'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqRowLayout } from './BoqRowLayout'
import { BoqRow } from './BoqRow'
import { boqRowsShapeEqualityFn, selectBoqRows } from 'client/entities/items'
import { onBoqRowDrag } from 'client/features/drag_boq_row'
import { BoqRowPasteItem } from './BoqRowPasteItem'
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
      onSortStart={(): void => {
        onBoqRowDrag.start()
      }}
      onSortEnd={({ oldIndex, newIndex }): void => {
        onBoqRowDrag.end({ oldIndex, newIndex, itemIndex })
      }}
    >
      <AnimatePresence initial={false}>
        {boqRows.map((boqRow, rowIndex) => {
          if (boqRow.type === 'boq row') {
            return (
              <BoqRowLayout
                key={boqRow.id}
                index={rowIndex} // 'index' is internal prop consumed by SortableElement HOC
                // disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
                i={rowIndex}
                // itemHeight={item?.height ?? 0}
                rowId={boqRow.id}
              >
                <BoqRow itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
              </BoqRowLayout>
            )
          }

          return <BoqRowPasteItem key={nanoid(3)} />
        })}
      </AnimatePresence>
    </DraggableBoqRowsContainer >
  )
}
