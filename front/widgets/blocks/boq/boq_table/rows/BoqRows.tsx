import { useSelector } from '@shared/lib/redux'
import { AnimatePresence } from 'motion/react'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import {
  selectBoqRows,
  RowProvider,
  useBlock,
  boqRowKey,
} from '@entities/quotation'
import { generateId } from '@shared/lib/nanoid'
import { BoqRowsLayout } from './BoqRowsLayout'
import { BoqRowsSortableContext } from './BoqRowsSortableContext'
import { BoqPasteRowTextOverlay } from './row/BoqPasteRowTextOverlay'
import { BoqRow } from './row/BoqRow'
import { BoqRowAnimate } from './row/BoqRowAnimate'
import { BoqRowSortable } from './row/BoqRowSortable'
import { arrayShapesEqualityFn } from '@shared/utils/arrayShapesEqualityFn'

export const BoqRows = (): React.JSX.Element => {
  const { blockIndex } = useBlock()

  const boqRows = useSelector(
    selectBoqRows({ blockIndex }),
    arrayShapesEqualityFn,
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
                  row={boqRow}
                  key={boqRow.id}
                >
                  <BoqRowAnimate>
                    <BoqRowSortable>
                      <BoqRow
                        onBlur={(e) => {
                          hideBoqRowPinsOnRowBlur({
                            blockIndex,
                            e,
                            rowIndex,
                          })
                        }}
                      />
                    </BoqRowSortable>
                  </BoqRowAnimate>
                </RowProvider>
              )
            }

            // boqRow.type = 'paste'
            return <BoqPasteRowTextOverlay key={generateId()} />
          })}
        </AnimatePresence>
      </BoqRowsSortableContext>
    </BoqRowsLayout>
  )
}
