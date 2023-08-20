import { Box } from '@mui/material'
import { theme } from '../clients'

interface Props {
  title: JSX.Element
  subtotalText: React.ReactNode
  price: JSX.Element
  currency: JSX.Element
  hideContent?: boolean
  outlined?: boolean
}

export const BoqHeaderLayout = ({
  title,
  subtotalText,
  price,
  currency,
  hideContent = false,
  outlined = false,
}: Props): JSX.Element => {

  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow: outlined ? '0 0 1px 1px #cf5757c3 inset' : 'none',
        },
        '& :where(.item)': {
          visibility: hideContent ? 'hidden' : 'visible',
        },
      }}
    >
      <Box
        className='layout title-subtotal'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '10px',
          background: '#343434e6',
          padding: '10px 15px',
          color: theme.colors.greyFont,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Box
          className='layout item title'
          sx={{
            flexGrow: 1,
          }}
        >
          {title}
        </Box>
        <Box
          className='layout subtotal-container'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flexShrink: 0,
            minWidth: 100,
          }}
        >
          <Box
            className='layout item subtotal-text'
          >
            {subtotalText}
          </Box>
          <Box
            className='layout price-currency'
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              gap: 10,
              width: '100%',
            }}
          >
            <Box
              className='layout item price'
              sx={{
                width: '100%',
                whiteSpace: 'nowrap',
                textAlign: 'right',
              }}
            >
              {price}
            </Box>
            <Box
              className='layout item currency'
              sx={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minWidth: 10,
              }}
            >
              {currency}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
