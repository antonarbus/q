import { BoqProvider } from '@entities/quotation/provider/BoqBlockProvider'
import { BlockComp } from '@entities/quotation/ui/BlockComp'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { Rows } from './row'

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
          <Rows />
        </RowLayout>
      </BoqProvider>
    </BlockComp>
  )
}
