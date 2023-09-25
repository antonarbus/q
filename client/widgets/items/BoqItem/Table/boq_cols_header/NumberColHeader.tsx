import { ResizableColHeader } from './ResizableColHeader'

type Props = {
  itemIndex: number
}

export const NumberColHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='number'
      className='th number resizable'
      itemIndex={itemIndex}
      minWidth={30}
      flexGrow={0}
    >
      #
    </ResizableColHeader>
  )
}
