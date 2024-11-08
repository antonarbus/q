import { getState } from '@shared/lib/redux'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { bookmarkPosAtBlocks, RowProvider } from '@entities/quotation'
import { BoqRow } from './row/BoqRow'

export const BoqRows = (): React.ReactNode => {
  const block = getState().quotation.blocks[bookmarkPosAtBlocks]

  if (block?.type !== 'row') return null

  return (
    <RowProvider
      rowIndex={0}
      row={block}
      key={block.id}
    >
      <BoqRow
        onBlur={(e) => {
          hideBoqRowPinsOnRowBlur({
            e,
            blockIndex: bookmarkPosAtBlocks,
            rowIndex: 0,
          })
        }}
      />
    </RowProvider>
  )
}
