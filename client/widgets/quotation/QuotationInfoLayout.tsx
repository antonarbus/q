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
        onClick={onClick}
        sx={{
          all: 'unset',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '5px',
          ':hover svg': {
            fill: '#3c5588 !important',
          },
        }}
      >
        <FaInfoCircle
          css={{
            fill: '#6488cf',
          }}
        />
        {quotationId}
      </Box>
    </Box>
  )
}
