import { ResizableColHeader } from './ResizableColHeader'

type Props = {
  itemIndex: number
}

export const ItemColHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='item'
      className='th item resizable'
      itemIndex={itemIndex}
      minWidth={100}
      flexGrow={0}
    >
      Item
    </ResizableColHeader>
  )
}
