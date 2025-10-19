import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { RowProvider } from '@entities/quotation/provider/RowProvider'
import { selectRows } from '@entities/quotation/redux/selector/selectRows'
import { hidePinsOnRowBlur } from '@features/blocks/pin'
import { generateId } from '@shared/lib/nanoid'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import { AnimatePresence } from 'motion/react'
import type { JSX } from 'react'
import { PasteRowTextOverlay } from './PasteRowTextOverlay'
import { Row } from './Row'
import { RowAnimate } from './RowAnimate'
import { RowSortable } from './RowSortable'
import { RowsLayout } from './RowsLayout'
import { RowsSortableContext } from './RowsSortableContext'

export const Rows = (): JSX.Element => {
  const block = useBlock()

  const rows = useSelector(
    selectRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  return (
    <RowsLayout>
      <RowsSortableContext>
        <AnimatePresence initial={false}>
          {rows.map((row, rowIndex) => {
            if (row.type === rowTypeKey.row) {
              return (
                <RowProvider key={row.id} item={row} index={rowIndex}>
                  <RowAnimate>
                    <RowSortable>
                      <Row
                        onBlur={(event) => {
                          hidePinsOnRowBlur({
                            blockIndex: block.index,
                            event,
                            rowIndex,
                          })
                        }}
                      />
                    </RowSortable>
                  </RowAnimate>
                </RowProvider>
              )
            }

            // row.type = 'paste'
            return <PasteRowTextOverlay key={generateId()} />
          })}
        </AnimatePresence>
      </RowsSortableContext>
    </RowsLayout>
  )
}
