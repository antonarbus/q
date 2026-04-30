import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { cls } from '@front/shared/cls'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { RowsWithOneBookmarkedRow } from './RowsWithOneBookmarkedRow'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@front/features/blocks/resize-boq-block/onBoqBlockResize'

export const BookmarkedRowBlock = (): React.JSX.Element => {
  return (
    <BlockComp
      autoWidth={true}
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
