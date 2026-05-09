import { Tooltip } from '@mui/material'
import { darken } from '@mui/material/styles'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { PiInfoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import type { FC } from 'react'

export const OpenInfoQuotationIcon: FC = () => {
  const isClipboardModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)
  const isEditorView = useIsEditorView()

  if (isEditorView === false) {
    return null
  }

  return (
    <Tooltip title='Info'>
      <Link
        style={{ lineHeight: 0.1, height: '100%' }}
        to={isClipboardModalVisible === true ? '' : `./${route.info}`}
      >
        <PiInfoBold
          css={{
            height: '100%',
            width: 'auto',
            fill: isClipboardModalVisible === true ? '#c6c6c6' : theme.color.accent,
            ...(isClipboardModalVisible === false && {
              ':hover': {
                fill: `${darken(theme.color.accent, 0.3)} !important`,
              },
            }),
          }}
        />
      </Link>
    </Tooltip>
  )
}
