import { Box } from '@mui/material'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { useRef, useState } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import { isOverflown } from 'client/shared/lib/isOverflown'
import type { BoqColWidth } from 'client/shared/types'
import { BoqRows } from './boq_rows/BoqRows'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const initColWidth = item.boq.column.description.width

  const [descriptionColWidth, setDescriptionColWidth] = useState<BoqColWidth>(initColWidth)


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
            // border: '1px dotted grey',
          },
          '.tr': {
            display: 'flex',
            minHeight: '40px',
            alignItems: 'flex-end',
            // alignItems: 'center',
            gap: '9px',
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
          <Box
            className='th number'
          >
            #
          </Box>
          <ResizableColHeader
            className='th description resizable'
            index={index}
            headerName='description'
            minWidth={200}
            makeItemWiderIfHeaderDoesNotFit={makeItemWiderIfHeaderDoesNotFit}
            descriptionColWidth={descriptionColWidth}
            setDescriptionColWidth={setDescriptionColWidth}
          >
            Description
          </ResizableColHeader>
          <Box
            className='th item'
          >
            Item
          </Box>
          <Box
            className='th qty'
          >
            Qty
          </Box>
          <Box
            className='th price'
          >
            Price
          </Box>
        </Box>
        <Box
          className='tr'
        >
          <Box
            className='td number'
          >
            1
          </Box>
          <Box
            className='td description'
          >
            Description 1
          </Box>
          <Box
            className='td item'
          >
            500
          </Box>
          <Box
            className='td qty'
          >
            1
          </Box>
          <Box
            className='td price'
          >
            500
          </Box>
        </Box>
        <Box
          className='tr'
        >
          <Box
            className='td number'
          >
            2
          </Box>
          <Box
            className='td description'
          >
            Description 2
          </Box>
          <Box
            className='td item'
          >
            600
          </Box>
          <Box
            className='td qty'
          >
            2
          </Box>
          <Box
            className='td price'
            sx={{
              // display: 'flex',
            }}
          >
            120000
          </Box>
        </Box>
        <Box
          className='tr'
        >
          <Box
            className='td number'
          >
            3
          </Box>
          <Box
            className='td description'
          >
            Description 3
          </Box>
          <Box
            className='td item'
          >
            700
          </Box>
          <Box
            className='td qty'
          >
            3
          </Box>
          <Box
            className='td price'
          >
            2100
          </Box>
        </Box>
        <BoqRows index={index} />
      </Box>
    </Box>
  )
}
