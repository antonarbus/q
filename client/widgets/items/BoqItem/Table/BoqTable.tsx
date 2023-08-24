import { Box } from '@mui/material'
import { Resizable } from 're-resizable'

export const BoqTable = (): JSX.Element => {
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
          }}
        >
          #
        </Box>
        <Box
          className='th'
          sx={{
            display: 'flex',
            flexGrow: 2,
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
              },
            }}
          >
            Description
          </Resizable>
        </Box>
        <Box
          className='th'
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Resizable
            enable={{ right: true }}
          >
            Item
          </Resizable>
        </Box>
        <Box
          className='th'
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Resizable
            enable={{ right: true }}
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
  )
}
