import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const QtyColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='qty'
      className='th qty resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Qty
    </ResizableColHeader>
  )
}
