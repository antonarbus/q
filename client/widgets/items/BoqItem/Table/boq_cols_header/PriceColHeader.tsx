import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  itemIndex: number
}

export const PriceColHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='price'
      className='th price resizable'
      itemIndex={itemIndex}
      minWidth={100}
      flexGrow={0}
    >
      Price
    </ResizableColHeader>
  )
}
