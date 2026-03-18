import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { cls } from '@shared/cls'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { RowsWithOneBookmarkedRow } from './RowsWithOneBookmarkedRow'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@feature/blocks/resize/resize-boq-block/onBoqBlockResize'

export const BookmarkedRowBlock = (): React.JSX.Element => {
  return (
    <BlockComp
      autoWidth
      className={cls.boqBlock}
      draggable={false}
      minWidth={560}
      onBlockResize={onBoqBlockResize}
      onBlockResizeStart={onBoqBlockResizeStart}
      onBlockResizeStop={onBoqBlockResizeStop}
    >
      <RowLayout>
        <RowColumns />
        <RowsWithOneBookmarkedRow />
      </RowLayout>
    </BlockComp>
  )
}
