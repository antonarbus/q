import { BlockComp } from '@entities/quotation'
import { cls } from '@shared/const/cls'
import { OneRow } from './boq-row/OneRow'
import type { JSX } from 'react'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'

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
