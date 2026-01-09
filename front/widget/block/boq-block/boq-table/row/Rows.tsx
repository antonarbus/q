import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { RowProvider } from '@entity/quotation/provider/RowProvider'
import { selectRows } from '@entity/quotation/redux/selector/selectRows'
import { hidePinsOnRowBlur } from '@feature/blocks/pin'
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
  const copyPlace = useSelector((state) => state.copy.place)
  const isPasteTextShown = useSelector((state) => state.copy.isPasteTextShown)

  const rows = useSelector(
    selectRows({ blockIndex: block.index }),
    arrayShapesEqualityFn,
  )

  return (
    <RowsLayout>
      <RowsSortableContext>
        <AnimatePresence initial={false}>
          {rows.map((row, rowIndex) => {
            const shouldShowPasteBefore =
              isPasteTextShown &&
              copyPlace.id === row.id &&
              copyPlace.pastePos === 'top'

            const shouldShowPasteAfter =
              isPasteTextShown &&
              copyPlace.id === row.id &&
              copyPlace.pastePos === 'bottom'

            return (
              <div key={`row-container-${row.id}`}>
                <AnimatePresence>
                  {shouldShowPasteBefore === true && (
                    <PasteRowTextOverlay key={`paste-before-${row.id}`} />
                  )}
                </AnimatePresence>
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
                <AnimatePresence>
                  {shouldShowPasteAfter === true && (
                    <PasteRowTextOverlay key={`paste-after-${row.id}`} />
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </AnimatePresence>
      </RowsSortableContext>
    </RowsLayout>
  )
}
