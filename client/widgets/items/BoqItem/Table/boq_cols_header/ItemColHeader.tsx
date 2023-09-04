import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const ItemColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='item'
      className='th item resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Item
    </ResizableColHeader>
  )
}
