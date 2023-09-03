import { Box } from '@mui/material'
import type { RefObject } from 'react'
import { ResizableHeader } from '../ResizableHeader'

interface Props {
  index: number
  headerRef: RefObject<HTMLDivElement>
}

export const BoqHeader = ({ index, headerRef }: Props): JSX.Element => {
  return (
    <Box
      ref={headerRef}
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
        headerRef={headerRef}
        flexGrow={0}
      >
        #
      </ResizableHeader>
      <ResizableHeader
        headerName='description'
        className='th description resizable'
        index={index}
        minWidth={200}
        headerRef={headerRef}
        flexGrow={1}
      >
        Description
      </ResizableHeader>
      <ResizableHeader
        headerName='item'
        className='th item resizable'
        index={index}
        minWidth={100}
        headerRef={headerRef}
        flexGrow={0}
      >
        Item
      </ResizableHeader>
      <ResizableHeader
        headerName='qty'
        className='th qty resizable'
        index={index}
        minWidth={100}
        headerRef={headerRef}
        flexGrow={0}
      >
        Qty
      </ResizableHeader>
      <ResizableHeader
        headerName='price'
        className='th price resizable'
        index={index}
        minWidth={100}
        headerRef={headerRef}
        flexGrow={0}
      >
        Price
      </ResizableHeader>
    </Box>
  )
}
