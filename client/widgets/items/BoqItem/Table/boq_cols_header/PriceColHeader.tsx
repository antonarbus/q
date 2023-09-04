import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const PriceColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='price'
      className='th price resizable'
      index={index}
      minWidth={100}
      flexGrow={0}
    >
      Price
    </ResizableColHeader>
  )
}
