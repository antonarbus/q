import { theme } from '@lib_instances/theme'
import { Box } from '@mui/material'

type Props = {
  title: JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const PriceHeaderLayout = ({
  title,
  hideContentForDevPurposes = false,
  outlinedForDevPurposes = false,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow: outlinedForDevPurposes
            ? '0 0 1px 1px #cf5757c3 inset'
            : 'none',
        },
        '& :where(.item)': {
          visibility: hideContentForDevPurposes ? 'hidden' : 'visible',
        },
      }}
    >
      <Box
        className='layout price-header'
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
