import {
  DndContext,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence } from 'framer-motion'
import { hideBoqRowPinsOnRowBlur } from '@features/items/cell/pin'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  RowProvider,
  useItem,
  // useIsBoqRowSortDisabled,
  boqRowKey,
  quotationSlice,
  getBoqRowsFromStore,
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

  // const isBoqRowSortDisabled = useIsBoqRowSortDisabled()

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      collisionDetection={closestCenter}
      onDragStart={() => {
        document.body.style.cursor = 'move'
        dispatch(quotationSlice.actions.disableFroalaReducer({ itemIndex }))
      }}
      onDragEnd={(event) => {
        const { active, over } = event

        if (!over) return
        if (active.id === over.id) return

        const oldIndex = boqRowIds.indexOf(String(active.id))
        const newIndex = boqRowIds.indexOf(String(over.id))
        const boqRows = getBoqRowsFromStore({ itemIndex })
        if (boqRows === undefined) return
        const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)

        dispatch(
          quotationSlice.actions.reOrderBoqRowsReducer({
            reOrderedBoqRows,
            itemIndex,
          }),
        )

        dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))
        document.body.style.removeProperty('cursor')
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
