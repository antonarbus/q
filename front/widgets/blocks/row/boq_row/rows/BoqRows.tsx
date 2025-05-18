import { getState } from '@shared/lib/redux'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { BOOKMARK_POS_AT_BLOCKS, RowProvider } from '@entities/quotation'
import { BoqRow } from './row/BoqRow'

export const BoqRows = (): React.ReactNode => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return null
  }

  return (
    <RowProvider
      rowIndex={0}
      row={block}
      key={block.id}
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
