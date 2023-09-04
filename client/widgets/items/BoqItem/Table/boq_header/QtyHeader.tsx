import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
}

export const QtyHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableHeader
      headerName='qty'
      className='th qty resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Qty
    </ResizableHeader>
  )
}
