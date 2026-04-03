import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { RowProvider } from '@front/entities/quotation/provider/row/RowProvider'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { BookmarkedRow } from './BookmarkedRow'
import { hidePinsOnRowBlur } from '@front/features/blocks/pin/hide-row-pins/hidePinsOnRowBlur'

export const RowsWithOneBookmarkedRow = (): React.ReactNode => {
  const block = reduxHolder.getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

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
