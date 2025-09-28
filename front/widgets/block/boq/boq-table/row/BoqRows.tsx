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
import { BoqPasteRowTextOverlay } from './boq-row/BoqPasteRowTextOverlay'
import { BoqRow } from './boq-row/BoqRow'
import { BoqRowAnimate } from './boq-row/BoqRowAnimate'
import { BoqRowSortable } from './boq-row/BoqRowSortable'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import type { JSX } from 'react'

export const BoqRows = (): JSX.Element => {
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
                  key={boqRow.id}
                  row={boqRow}
                  rowIndex={rowIndex}
                >
                  <BoqRowAnimate>
                    <BoqRowSortable>
                      {/* eslint-disable-next-line react/jsx-max-depth */}
                      <BoqRow
                        onBlur={(event) => {
                          hideBoqRowPinsOnRowBlur({
                            blockIndex,
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
