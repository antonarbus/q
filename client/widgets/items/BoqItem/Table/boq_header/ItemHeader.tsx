import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
}

export const ItemColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableHeader
      headerName='item'
      className='th item resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Item
    </ResizableHeader>
  )
}
