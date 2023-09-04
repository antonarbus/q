import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const NumberColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='number'
      className='th number resizable'
      index={index}
      minWidth={30}
      flexGrow={0}
    >
      #
    </ResizableColHeader>
  )
}
