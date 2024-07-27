import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { BlockComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { OneRow } from './boq_row/OneRow'

export const RowBlock = (): JSX.Element => {
  return (
    <BlockComp
      className={cls.boqBlock}
      autoWidth={true}
      minWidth='560px'
      onBlockResizeStart={onBoqBlockResizeStart}
      onBlockResize={onBoqBlockResize}
      onBlockResizeStop={onBoqBlockResizeStop}
    >
      <OneRow />
    </BlockComp>
  )
}
