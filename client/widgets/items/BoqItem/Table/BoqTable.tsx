import { Box } from '@mui/material'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { BoqColWidth } from 'client/shared/types'
import { Resizable } from 're-resizable'
import { useRef, useState } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import { isOverflown } from 'client/shared/lib/isOverflown'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element => {

  const ref = useRef<HTMLDivElement>(null)

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
          ref={ref}
          className='tr'
          sx={{
            display: 'flex',
            minHeight: '40px',
            alignItems: 'center',
            gap: '9px',
          }}
          onClick={(e): void => {
            console.log(e.currentTarget)
            const overflown = isOverflown({ element: e.currentTarget })
            console.log('🚀  overflown:', overflown)
            // todo: if header is overflown on col width change, then start change the width of paper
            if (overflown) {
              // dispatch(itemsSlice.actions.saveItemWidth({ index, width: 600 }))
              dispatch(itemsSlice.actions.makeItemBitWider({ index }))
            }
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
            className='th resizable'
            index={index}
            headerName='description'
            minWidth={200}
          >
            Description
          </ResizableColHeader>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
              minWidth: '100px',
            }}
          >
            Item
          </Box>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
              minWidth: '100px',
            }}
          >
            Qty
          </Box>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
              minWidth: '100px',
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
