import { Box } from '@mui/material'
import { getState } from 'client/shared/clients'
import { useRef } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import { BoqRows } from './boq_rows/BoqRows'
import { useSelectorTyped } from 'client/shared/hooks'
import { selectColumnWidth } from 'client/entities/items'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'description' }))
  const headerRef = useRef<HTMLDivElement>(null)

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
          '.description': {
            display: !descriptionColWidth ? 'flex' : 'block',
            flexGrow: !descriptionColWidth ? 1 : 0,
            flexShrink: 0,
            width: descriptionColWidth ?? 'auto',
          },
          '.item, .qty, .price': {
            flexGrow: 1,
            minWidth: '100px',
            width: '100%',
          },
        }}
      >
        <Box
          ref={headerRef}
          className='header tr'
        >
          <Box className='th icons'></Box>
          <Box className='th number'>#</Box>
          <ResizableColHeader
            className='th description resizable'
            index={index}
            headerName='description'
            minWidth={200}
            headerRef={headerRef}
          >
            Description
          </ResizableColHeader>
          <Box className='th item'>Item</Box>
          <Box className='th qty'>Qty</Box>
          <Box className='th price'>Price</Box>
        </Box>
        <BoqRows index={index} />
      </Box>
    </Box>
  )
}
