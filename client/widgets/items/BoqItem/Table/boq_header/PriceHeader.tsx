import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
}

export const PriceHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableHeader
      headerName='price'
      className='th price resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Price
    </ResizableHeader>
  )
}
