import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { Tooltip } from '@mui/material'
import { route } from '@shared/lib/react-router-dom/route'
import { PiInfoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const OpenInfoQuotationIcon = (): React.JSX.Element => {
  const disabled = useIsCopyModalVisible()

  return (
    <Tooltip title='Info'>
      <Link
        style={{ lineHeight: 0.1, height: '100%' }}
        to={disabled === true ? '' : `./${route.info}`}
      >
        <PiInfoBold
          css={{
            height: '100%',
            width: 'auto',
            fill: disabled === true ? '#c6c6c6' : '#6488cf',
            ...(disabled === false && {
              ':hover': {
                fill: '#3c5588 !important',
              },
            }),
          }}
        />
      </Link>
    </Tooltip>
  )
}
