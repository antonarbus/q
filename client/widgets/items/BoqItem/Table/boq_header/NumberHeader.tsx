import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
}

export const NumberHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableHeader
      headerName='number'
      className='th number resizable'
      index={index}
      minWidth={30}
      flexGrow={0}
    >
      #
    </ResizableHeader>
  )
}
