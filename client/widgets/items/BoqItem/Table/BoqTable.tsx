import { Box } from '@mui/material'
import { getState } from 'client/shared/clients'
import { useRef } from 'react'
import { ResizableHeader } from './ResizableHeader'
import { BoqRows } from './boq_rows/BoqRows'
import { useSelectorTyped } from 'client/shared/hooks'
import { selectColumnWidth } from 'client/entities/items'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element | null => {
  const headerRef = useRef<HTMLDivElement>(null)
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Box
      className='boq-table-container-with-paddings'
      sx={{ p: '10px' }}
    >
      <Box
        className='boq-table-container'
        sx={{
          overflow: 'auto',
          '& *': {
            background: '#ff00001b',
            // border: '1px dotted grey',
          },
        }}
      >
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
          <Box
            className='th icons'
            sx={{
              width: '30px',
              minWidth: '30px',
            }}
          >
          </Box>
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
        <BoqRows index={index} />
      </Box>
    </Box>
  )
}
