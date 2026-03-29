import { Box } from '@mui/material'
import { theme } from '@front/shared/theme'

type Props = {
  title: React.JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const PriceHeaderLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow: props.outlinedForDevPurposes === true ? '0 0 1px 1px #cf5757c3 inset' : 'none',
        },
        '& :where(.content)': {
          visibility: props.hideContentForDevPurposes === true ? 'hidden' : 'visible',
        },
      }}
    >
      <Box
        className='layout content price-header'
        style={{
          background: '#343434e6',
          padding: '15px 15px',
          color: theme.colors.greyFont,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          minHeight: '50px',
        }}
      >
        {props.title}
      </Box>
    </Box>
  )
}
