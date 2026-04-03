import { Tooltip } from '@mui/material'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { PiInfoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const OpenInfoQuotationIcon = (): React.JSX.Element => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  return (
    <Tooltip title='Info'>
      <Link
        style={{ lineHeight: 0.1, height: '100%' }}
        to={isCopyModalVisible === true ? '' : `./${route.info}`}
      >
        <PiInfoBold
          css={{
            height: '100%',
            width: 'auto',
            fill: isCopyModalVisible === true ? '#c6c6c6' : '#6488cf',
            ...(isCopyModalVisible === false && {
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
