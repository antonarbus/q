import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const DescriptionColHeader = ({ index }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='description'
      className='th description resizable'
      index={index}
      minWidth={200}
      flexGrow={1}
    >
      Description
    </ResizableColHeader>
  )
}
