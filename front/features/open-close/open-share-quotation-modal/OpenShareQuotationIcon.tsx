import { Tooltip } from '@mui/material'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { BsPersonFillLock } from 'react-icons/bs'
import { PiGlobe, PiGlobeX } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import type { FC } from 'react'

export const OpenShareQuotationIcon: FC = () => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)
  const access = reduxHolder.useSelector((state) => state.quotation.access)
  const isEditorView = useIsEditorView()

  if (isEditorView) {
    return null
  }

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
        to={isCopyModalVisible === true ? '' : `./${route.share}`}
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
