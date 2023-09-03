import { Box } from '@mui/material'
import { useRef, type RefObject } from 'react'
import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
}

export const BoqHeader = ({ index }: Props): JSX.Element => {

  return (
    <Box
      className='header tr'
      sx={{
        display: 'flex',
        minHeight: '40px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      <ResizableHeader
        headerName='number'
        className='th number resizable'
        index={index}
        minWidth={30}
        flexGrow={0}
      >
        #
      </ResizableHeader>
      <ResizableHeader
        headerName='description'
        className='th description resizable'
        index={index}
        minWidth={200}
        flexGrow={1}
      >
        Description
      </ResizableHeader>
      <ResizableHeader
        headerName='item'
        className='th item resizable'
        index={index}
        minWidth={100}
        flexGrow={0}
      >
        Item
      </ResizableHeader>
      <ResizableHeader
        headerName='qty'
        className='th qty resizable'
        index={index}
        minWidth={100}
        flexGrow={0}
      >
        Qty
      </ResizableHeader>
      <ResizableHeader
        headerName='price'
        className='th price resizable'
        index={index}
        minWidth={100}
        flexGrow={0}
      >
        Price
      </ResizableHeader>
    </Box>
  )
}
