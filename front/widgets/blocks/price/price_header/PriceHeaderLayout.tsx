import { theme } from '@shared/theme'
import { Box } from '@mui/material'

type Props = {
  title: React.JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const PriceHeaderLayout = ({
  title,
  hideContentForDevPurposes = false,
  outlinedForDevPurposes = false,
}: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow:
            outlinedForDevPurposes === true
              ? '0 0 1px 1px #cf5757c3 inset'
              : 'none',
        },
        '& :where(.content)': {
          visibility: hideContentForDevPurposes === true ? 'hidden' : 'visible',
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
        {title}
      </Box>
    </Box>
  )
}
