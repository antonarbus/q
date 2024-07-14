import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/items/resize'
import { BlockComp } from '@entities/quotation'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqBlockForEditModal = (): JSX.Element => {
  return (
    <BlockComp
      className='boq-item'
      autoWidth={true}
      minWidth='560px'
      onItemResizeStart={onBoqBlockResizeStart}
      onItemResize={onBoqBlockResize}
      onItemResizeStop={onBoqBlockResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <BoqHeader />
      <BoqTable />
    </BlockComp>
  )
}
