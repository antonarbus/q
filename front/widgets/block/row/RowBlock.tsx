import { BlockComp } from '@entities/quotation/ui/BlockComp'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { cls } from '@shared/cls'
import type { JSX } from 'react'
import { OneRow } from './OneRow'

export const RowBlock = (): JSX.Element => {
  return (
    <BlockComp
      autoWidth
      className={cls.boqBlock}
      minWidth={560}
      onBlockResize={onBoqBlockResize}
      onBlockResizeStart={onBoqBlockResizeStart}
      onBlockResizeStop={onBoqBlockResizeStop}
    >
      <OneRow />
    </BlockComp>
  )
}
