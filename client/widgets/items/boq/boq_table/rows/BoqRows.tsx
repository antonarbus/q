import {
  DndContext,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { hideBoqRowPinsOnRowBlur } from '@features/items/cell/pin'
import { onBoqRowDragEnd, onBoqRowDragStart } from '@features/items/drag'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  RowProvider,
  useItem,
  boqRowKey,
} from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowAnimate } from './row/BoqRowAnimate'

export const BoqRows = (): JSX.Element => {
  const { itemIndex } = useItem()
  const boqRows = useSelectorTyped(
    selectBoqRows({ itemIndex }),
    boqRowsShapeEqualityFn,
  )

  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onBoqRowDragStart({ itemIndex })}
      onDragEnd={onBoqRowDragEnd({ itemIndex, boqRowIds })}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <SortableContext
        items={boqRowIds}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence initial={false}>
          {boqRows.map((boqRow, rowIndex) => {
            if (boqRow.type === boqRowKey.row) {
              return (
                <RowProvider
                  rowIndex={rowIndex}
                  rowId={boqRow.id}
                  key={boqRow.id}
                >
                  <BoqRowAnimate>
                    <BoqRow
                      onBlur={(e) => {
                        hideBoqRowPinsOnRowBlur({ e, itemIndex, rowIndex })
                      }}
                    />
                  </BoqRowAnimate>
                </RowProvider>
              )
            }

            if (boqRow.type === boqRowKey.paste) {
              return <BoqPasteRowTextOverlay key={nanoid(5)} />
            }

            return null
          })}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  )
}
