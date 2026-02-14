import { Box } from '@mui/material'
import { theme } from '@shared/theme'

type Props = {
  title: React.JSX.Element
  subtotalText: React.ReactNode
  subTotalPrice: React.JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const BoqHeaderLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow:
            props.outlinedForDevPurposes === true
              ? '0 0 1px 1px #cf5757c3 inset'
              : 'none',
        },
        '& :where(.content)': {
          visibility:
            props.hideContentForDevPurposes === true ? 'hidden' : 'visible',
        },
      }}
    >
      <Box
        className='layout title-subtotal'
        style={{
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
          className='layout content title'
          style={{
            flexGrow: 1,
          }}
        >
          {props.title}
        </Box>
        <Box
          className='layout subtotal-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            minWidth: '150px',
            flexShrink: 0,
          }}
        >
          <Box
            className='layout content subtotal-text'
            style={{
              width: '100%',
              textAlign: 'right',
            }}
          >
            {props.subtotalText}
          </Box>
          <Box
            className='layout price'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              gap: '10px',
              width: '100%',
            }}
          >
            <Box
              className='layout content price'
              style={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
                minWidth: '60px',
              }}
            >
              {props.subTotalPrice}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
