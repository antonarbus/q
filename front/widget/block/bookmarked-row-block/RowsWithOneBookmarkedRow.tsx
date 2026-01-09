import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { RowProvider } from '@entity/quotation/provider/RowProvider'
import { hidePinsOnRowBlur } from '@feature/blocks/pin'
import { getState } from '@shared/lib/redux'
import type { ReactNode } from 'react'
import { BookmarkedRow } from './BookmarkedRow'

export const RowsWithOneBookmarkedRow = (): ReactNode => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return null
  }

  return (
    <RowProvider key={block.id} item={block} index={0}>
      <BookmarkedRow
        onBlur={(event) => {
          hidePinsOnRowBlur({
            event,
            blockIndex: BOOKMARK_POS_AT_BLOCKS,
            rowIndex: 0,
          })
        }}
      />
    </RowProvider>
  )
}
