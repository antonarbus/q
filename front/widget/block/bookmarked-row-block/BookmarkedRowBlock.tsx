import { BoqProvider } from '@entity/quotation/provider/BoqBlockProvider'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@feature/blocks/resize'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { RowsWithOneBookmarkedRow } from './RowsWithOneBookmarkedRow'

export const BookmarkedRowBlock = (): JSX.Element => {
  return (
    <BlockComp
      autoWidth
      className={cls.boqBlock}
      minWidth={560}
      onBlockResize={onBoqBlockResize}
      onBlockResizeStart={onBoqBlockResizeStart}
      onBlockResizeStop={onBoqBlockResizeStop}
    >
      <BoqProvider>
        <RowLayout>
          <RowColumns />
          <RowsWithOneBookmarkedRow />
        </RowLayout>
      </BoqProvider>
    </BlockComp>
  )
}
