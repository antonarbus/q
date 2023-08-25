import { Box } from '@mui/material'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { BoqColWidth } from 'client/shared/types'
import { Resizable } from 're-resizable'
import { useState } from 'react'
import { ResizableColHeader } from './ResizableColHeader'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const initDescriptionColWidth = item.boq.column.description.width
  const [descriptionColWidth, setDescriptionColWidth] = useState<BoqColWidth>(initDescriptionColWidth)

  return (
    <Box
      className='boq-table-container-with-paddings'
      sx={{
        p: '10px',
      }}
    >
      <Box
        className='boq-table-container'
        sx={{
          overflow: 'auto',
          '& > *, & > * > *': {
            background: '#ff00003d',
          },
        }}
      >
        <Box
          className='tr'
          sx={{
            display: 'flex',
            minHeight: '40px',
            alignItems: 'center',
            gap: '9px',
          }}
        >
          <Box
            className='th'
            sx={{
              width: '30px',
              minWidth: '30px',
            }}
          >
            #
          </Box>
          <ResizableColHeader
            index={index}
            headerName='description'
            flexGrow={4}
            minWidth={200}
          >
            Description
          </ResizableColHeader>
          <ResizableColHeader
            index={index}
            headerName='item'
            flexGrow={1}
            minWidth={100}
          >
            Item
          </ResizableColHeader>
          <ResizableColHeader
            index={index}
            headerName='qty'
            flexGrow={1}
            minWidth={100}
          >
            Qty
          </ResizableColHeader>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
            }}
          >
            Price
          </Box>
        </Box>
        <Box
          className='tr'
          sx={{
            display: 'flex',
            minHeight: '40px',
            alignItems: 'flex-end',
          }}
        >
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            1
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            Description 1
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            500
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            1
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            500
          </Box>
        </Box>
        <Box
          className='tr'
          sx={{
            display: 'flex',
            minHeight: '40px',
            alignItems: 'flex-end',
          }}
        >
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            2
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            Description 2
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            600
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            2
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            1200
          </Box>
        </Box>
        <Box
          className='tr'
          sx={{
            display: 'flex',
            minHeight: '40px',
            alignItems: 'flex-end',
          }}
        >
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            3
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            Description 3
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            700
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            3
          </Box>
          <Box
            className='td'
            sx={{
              display: 'flex',
            }}
          >
            2100
          </Box>
        </Box>
      </Box>
    </Box >
  )
}
