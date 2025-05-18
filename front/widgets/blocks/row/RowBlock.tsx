import { BlockComp } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { OneRow } from './boq_row/OneRow'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'

export const RowBlock = (): React.JSX.Element => {
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
