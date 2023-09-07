import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  itemIndex: number
}

export const DescriptionColHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <ResizableColHeader
      headerName='description'
      className='th description resizable'
      itemIndex={itemIndex}
      minWidth={200}
      flexGrow={1}
    >
      Description
    </ResizableColHeader>
  )
}
