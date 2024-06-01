import {
  DndContext,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { hideBoqRowPinsOnRowBlur } from '@features/items/cell/pin'
import { onBoqRowDrag } from '@features/items/drag'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  RowProvider,
  useItem,
  useIsBoqRowSortDisabled,
  boqRowKey,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { nanoid } from '@shared/lib/nanoid'
import { DraggableBoqRowsContainer } from './DraggableBoqRowsContainer'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowAnimate } from './row/BoqRowAnimate'

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

export const BoqRows = (): JSX.Element => {
  const { itemIndex } = useItem()
  const boqRows = useSelectorTyped(
    selectBoqRows({ itemIndex }),
    boqRowsShapeEqualityFn,
  )

  const boqRowIds = boqRows.map((boqRow) => boqRow.id)

  const isBoqRowSortDisabled = useIsBoqRowSortDisabled()

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    // <DraggableBoqRowsContainer
    //   useDragHandle
    //   useWindowAsScrollContainer
    //   onSortStart={() => {
    //     onBoqRowDrag.start({ itemIndex })
    //   }}
    //   onSortEnd={({ oldIndex, newIndex }) => {
    //     onBoqRowDrag.end({ oldIndex, newIndex, itemIndex })
    //   }}
    // >
    <DndContext
      sensors={sensors}
      measuring={measuringConfig}
      collisionDetection={closestCenter}
      onDragStart={() => {
        // onBoqRowDrag.start({ itemIndex })
      }}
      onDragEnd={() => {}}
      // onDragEnd={(event) => {
      //   const { active, over,  } = event

      //   if (active.id !== over.id) {
      //     setItems((items) => {
      //       const oldIndex = items.indexOf(active.id)
      //       const newIndex = items.indexOf(over.id)

      //       return arrayMove(items, oldIndex, newIndex)
      //     })
      //   }
      // }}
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
    // </DraggableBoqRowsContainer>
  )
}
