import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { hideBoqRowPinsOnRowBlur } from '@features/items/cell/pin'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  RowProvider,
  useItem,
  boqRowKey,
} from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { BoqRowsLayout } from './BoqRowsLayout'
import { BoqRowsSortableContext } from './BoqRowsSortableContext'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowAnimate } from './row/BoqRowAnimate'
import { BoqRowSortable } from './row/BoqRowSortable'

export const BoqRows = (): JSX.Element => {
  const { itemIndex } = useItem()
  const boqRows = useSelectorTyped(
    selectBoqRows({ itemIndex }),
    boqRowsShapeEqualityFn,
  )

  return (
    <BoqRowsLayout>
      <BoqRowsSortableContext>
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
                    <BoqRowSortable>
                      <BoqRow
                        onBlur={(e) => {
                          hideBoqRowPinsOnRowBlur({ e, itemIndex, rowIndex })
                        }}
                      />
                    </BoqRowSortable>
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
      </BoqRowsSortableContext>
    </BoqRowsLayout>
  )
}
