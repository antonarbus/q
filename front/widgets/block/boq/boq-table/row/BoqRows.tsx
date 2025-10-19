import { boqRowKey } from '@entities/quotation/const/boqRowKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { RowProvider } from '@entities/quotation/provider/RowProvider'
import { selectBoqRows } from '@entities/quotation/redux/selector/selectBoqRows'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { generateId } from '@shared/lib/nanoid'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import { AnimatePresence } from 'motion/react'
import type { JSX } from 'react'
import { BoqRowsLayout } from './BoqRowsLayout'
import { BoqRowsSortableContext } from './BoqRowsSortableContext'
import { BoqPasteRowTextOverlay } from './boq-row/BoqPasteRowTextOverlay'
import { BoqRow } from './boq-row/BoqRow'
import { BoqRowAnimate } from './boq-row/BoqRowAnimate'
import { BoqRowSortable } from './boq-row/BoqRowSortable'

export const BoqRows = (): JSX.Element => {
  const block = useBlock()

  const boqRows = useSelector(
    selectBoqRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  return (
    <BoqRowsLayout>
      <BoqRowsSortableContext>
        <AnimatePresence initial={false}>
          {boqRows.map((boqRow, rowIndex) => {
            if (boqRow.type === boqRowKey.row) {
              return (
                <RowProvider key={boqRow.id} row={boqRow} rowIndex={rowIndex}>
                  <BoqRowAnimate>
                    <BoqRowSortable>
                      <BoqRow
                        onBlur={(event) => {
                          hideBoqRowPinsOnRowBlur({
                            blockIndex: block.index,
                            event,
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
