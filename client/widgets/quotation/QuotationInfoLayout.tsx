import { Box } from '@mui/material'
import { FaInfoCircle } from 'react-icons/fa'

type Props = {
  quotationId: string
  onClick: () => void
}

export const QuotationInfoLayout = ({
  quotationId,
  onClick,
}: Props): JSX.Element => {
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
        translate: '0px 5px',
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
