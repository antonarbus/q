import { useIsCopyModalVisible } from '@entities/copy'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import { route } from '@shared/const/route'
import { PiGlobeX, PiGlobe } from 'react-icons/pi'
import { BsPersonFillLock } from 'react-icons/bs'
import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'

export const OpenShareQuotationIcon = (): JSX.Element => {
  const disabled = useIsCopyModalVisible()
  const access = useSelector((state) => state.quotation.access)

  return (
    <Tooltip title='Share'>
      <Link
        css={{
          lineHeight: 0.1,
          height: '100%',
          color: access.level === 'everyone' ? '#6488cf' : 'grey',
          ':hover': {
            color: '#3c5588 !important',
          },
        }}
        to={disabled === true ? '' : `./${route.share}`}
      >
        {access.level === 'everyone' && (
          <PiGlobe
            css={{
              height: '100%',
              width: 'auto',
            }}
          />
        )}
        {access.level === 'custom' && (
          <BsPersonFillLock
            css={{
              height: '100%',
              width: 'auto',
            }}
          />
        )}
        {access.level === 'nobody' && (
          <PiGlobeX
            css={{
              height: '100%',
              width: 'auto',
            }}
          />
        )}
      </Link>
    </Tooltip>
  )
}
