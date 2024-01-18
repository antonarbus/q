import { theme } from '@lib_instances/theme'
import { Box } from '@mui/material'

type Props = {
  title: JSX.Element
  subtotalText: React.ReactNode
  subTotalPrice: JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const BoqHeaderLayout = ({
  title,
  subtotalText,
  subTotalPrice,
  hideContentForDevPurposes = false,
  outlinedForDevPurposes = false,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow: outlinedForDevPurposes ? '0 0 1px 1px #cf5757c3 inset' : 'none',
        },
        '& :where(.item)': {
          visibility: hideContentForDevPurposes ? 'hidden' : 'visible',
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
            minWidth: '100px',
          }}
        >
          <Box
            className='layout item subtotal-text'
            sx={{
              width: '100%',
              textAlign: 'right',
            }}
          >
            {subtotalText}
          </Box>
          <Box
            className='layout price'
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              gap: '10px',
              width: '100%',
            }}
          >
            <Box
              className='layout item price'
              sx={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
                minWidth: '60px',
              }}
            >
              {subTotalPrice}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
