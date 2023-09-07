import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  itemIndex: number
}

export const QtyColHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='qty'
      className='th qty resizable'
      itemIndex={itemIndex}
      minWidth={100}
      flexGrow={0}
    >
      Qty
    </ResizableColHeader>
  )
}
