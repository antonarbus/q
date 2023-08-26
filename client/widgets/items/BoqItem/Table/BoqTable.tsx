import { Box } from '@mui/material'
import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useRef } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import { isOverflown } from 'client/shared/lib/isOverflown'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element => {

  const headerRef = useRef<HTMLDivElement>(null)

  const makeItemWiderIfHeaderDoesNotFit = (): void => {
    if (!headerRef.current) return
    const isHeaderOverflown = isOverflown({ element: headerRef.current })
    if (isHeaderOverflown) {
      dispatch(itemsSlice.actions.makeItemBitWider({ index }))
    }
  }


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
          ref={headerRef}
          className='header tr'
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
            makeItemWiderIfHeaderDoesNotFit={makeItemWiderIfHeaderDoesNotFit}
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
