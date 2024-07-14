import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import {
  boqRowsShapeEqualityFn,
  selectBoqRows,
  RowProvider,
  useBlock,
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
  const { blockIndex } = useBlock()
  const boqRows = useSelectorTyped(
    selectBoqRows({ blockIndex }),
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
                  id={boqRow.id}
                  key={boqRow.id}
                >
                  <BoqRowAnimate>
                    <BoqRowSortable>
                      <BoqRow
                        onBlur={(e) => {
                          hideBoqRowPinsOnRowBlur({ e, blockIndex, rowIndex })
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
