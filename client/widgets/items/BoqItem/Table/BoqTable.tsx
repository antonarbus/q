import { Box } from '@mui/material'


export const BoqTable = (): JSX.Element => {
  return (
    <Box
      sx={{
        p: '10px',
        '& *': {
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
          }}
        >
          Description
        </Box>
        <Box
          className='th'
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          Item
        </Box>
        <Box
          className='th'
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          Qty
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
