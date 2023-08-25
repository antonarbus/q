import { Box } from '@mui/material'
import { Resizable } from 're-resizable'
import { useState } from 'react'

export const BoqTable = (): JSX.Element => {
  const [isColResized, setIsColResized] = useState(false)
  const [widthDescriptionCol, setWidthDescriptionCol] = useState<number | '100%'>('100%')


  return (
    <Box
      sx={{
        p: '10px',
        '& > *, & > * > *': {
          background: '#ff00003d',
          border: '1px dotted grey',
        },
      }}
    >
      <Box
        className='tr'
        sx={{
          display: 'flex',
          minHeight: '40px',
          alignItems: 'center',
          gap: '10px',
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
          className='resizable'
          enable={{ right: true }}
          style={{
            display: !isColResized ? 'flex' : 'block',
            flexGrow: !isColResized ? 3 : 0,
            flexShrink: 0,
            width: widthDescriptionCol,
          }}
          handleStyles={{
            right: {
              background: 'grey',
              width: '3px',
              right: '-7.5px',
              borderRadius: '3px',
            },
          }}
          onResizeStart={(event, direction, element): void => {
            const newWidth = element.clientWidth
            console.log('🚀  newWidth:', newWidth)
            setWidthDescriptionCol(newWidth)
            setIsColResized(true)

          }}
          onResize={(event, direction, element, delta): void => {
            const newWidth = element.clientWidth
            console.log('🚀  newWidth:', newWidth)
            setWidthDescriptionCol(element.clientWidth)
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
                right: '-7.5px',
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
                right: '-7.5px',
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
    </Box >
  )
}
