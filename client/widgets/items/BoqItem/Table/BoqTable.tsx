import { Box } from '@mui/material'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { BoqColWidth } from 'client/shared/types'
import { Resizable } from 're-resizable'
import { useState } from 'react'

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
              display: 'flex',
              width: '40px',
              minWidth: '40px',
            }}
          >
            #
          </Box>
          <Resizable
            className='th resizable'
            enable={{ right: true }}
            minWidth={200}
            size={{
              width: descriptionColWidth ?? '100%',
              height: 'auto',
            }}
            style={{
              display: !descriptionColWidth ? 'flex' : 'block',
              flexGrow: !descriptionColWidth ? 4 : 0,
              flexShrink: 0,
              width: descriptionColWidth,
            }}
            handleStyles={{
              right: {
                background: 'grey',
                width: '3px',
                right: '-6px',
                borderRadius: '3px',
              },
            }}
            onResizeStart={(event, direction, element): void => {
              const newWidth = element.clientWidth
              setDescriptionColWidth(newWidth)
            }}
            onResize={(event, direction, element, delta): void => {
              const newWidth = element.clientWidth
              setDescriptionColWidth(newWidth)
            }}
            onResizeStop={(event, direction, element): void => {
              const width = element.clientWidth
              dispatch(itemsSlice.actions.saveColWidth({ index, width, colKey: 'description' }))
              saveItemsLocally()
              dispatch(itemsSlice.actions.tellItemSavedLocally({ index }))
            }}
          >
            Description
          </Resizable>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <Resizable
              className='resizable'
              enable={{ right: true }}
              style={{
                width: '100%',
                position: 'static',
              }}
              handleStyles={{
                right: {
                  background: 'grey',
                  width: '3px',
                  right: '0',
                  borderRadius: '3px',
                },
              }}
            >
              Item
            </Resizable>
          </Box>
          <Box
            className='th'
            sx={{
              display: 'flex',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <Resizable
              className='resizable'
              enable={{ right: true }}
              style={{
                width: '100%',
                position: 'static',
              }}
              handleStyles={{
                right: {
                  background: 'grey',
                  width: '3px',
                  right: '0',
                  borderRadius: '3px',
                },
              }}
            >
              Qty
            </Resizable>
          </Box>
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
