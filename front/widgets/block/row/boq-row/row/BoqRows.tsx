import { getState } from '@shared/lib/redux'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { BOOKMARK_POS_AT_BLOCKS, RowProvider } from '@entities/quotation'
import { BoqRow } from './boq-row/BoqRow'
import type { ReactNode } from 'react'

export const BoqRows = (): ReactNode => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return null
  }

  return (
    <RowProvider
      key={block.id}
      row={block}
      rowIndex={0}
    >
      <BoqRow
        onBlur={(event) => {
          hideBoqRowPinsOnRowBlur({
            event,
            blockIndex: BOOKMARK_POS_AT_BLOCKS,
            rowIndex: 0,
          })
        }}
      />
    </RowProvider>
  )
}
