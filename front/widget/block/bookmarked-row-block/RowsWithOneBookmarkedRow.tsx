import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { RowProvider } from '@entity/quotation/provider/RowProvider'
import { getState } from '@shared/lib/redux'
import { BookmarkedRow } from './BookmarkedRow'
import { hidePinsOnRowBlur } from '@feature/blocks/hide-row-pins/hidePinsOnRowBlur'

export const RowsWithOneBookmarkedRow = (): React.ReactNode => {
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
