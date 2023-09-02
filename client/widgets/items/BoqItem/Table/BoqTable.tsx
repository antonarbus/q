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

  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'description' }))
  const isDescriptionColWidthSetManually = descriptionColWidth !== undefined

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
          '.tr': {
            display: 'flex',
            minHeight: '40px',
            alignItems: 'flex-end',
            position: 'relative',
            // alignItems: 'center',
            gap: '9px',
          },
          '.icons': {
            width: '30px',
            minWidth: '30px',
          },
          '.number': {
            width: '30px',
            minWidth: '30px',
          },
          // '.description': {
          //   display: isDescriptionColWidthSetManually ? 'block' : 'flex',
          //   flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
          //   flexShrink: 0,
          //   width: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
          //   minWidth: '200px',
          // },
          // '.item, .qty, .price': {
          //   flexGrow: 1,
          //   minWidth: '100px',
          //   width: '100%',
          // },
        }}
      >
        <Box
          ref={headerRef}
          className='header tr'
        >
          <Box className='th icons'></Box>
          <Box className='th number'>#</Box>
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
          {/* <Box className='th item'>Item</Box> */}
          {/* <Box className='th qty'>Qty</Box> */}
          {/* <Box className='th price'>Price</Box> */}
        </Box>
        <BoqRows index={index} />
      </Box>
    </Box>
  )
}
