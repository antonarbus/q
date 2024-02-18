import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { FaInfoCircle } from 'react-icons/fa'

export const QuotationInfo = (): JSX.Element => {
  const quotationId = useSelectorTyped(state => state.quotation.id)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontWeight: 600,
        color: 'grey',
        paddingRight: '15px',
        height: '20px',
      }}
    >
      <Box
        component='button'
        onClick={() => {
          alert('show popup with all info with proper route')
        }}
        sx={{
          all: 'unset',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '5px',
        }}
      >
        <FaInfoCircle
          css={{
            fill: '#6488cf',
          }}
        />
        <span
          css={{
            fontWeight: 400,
          }}
        >
          id:
        </span>
        {quotationId}
      </Box>
    </Box>
  )
}
