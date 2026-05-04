import { Box, Tooltip } from '@mui/material'
import { openShareQuotationModal } from '@front/features/open-close/open-share-quotation-modal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { PiShare } from 'react-icons/pi'

type Badge = { color: string; label: string }

export const StatusBadge = (): React.ReactNode => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)
  const accessLevel = reduxHolder.useSelector((state) => state.quotation.access.level)

  const resolveSharedLabel = (): string => {
    if (permissionLevel === 'PUBLIC') {
      return 'Public'
    }

    if (permissionLevel === 'SHARED') {
      return 'Shared'
    }

    if (accessLevel === 'everyone') {
      return 'Public'
    }

    return 'Shared'
  }

  const isShared =
    permissionLevel === 'SHARED' ||
    permissionLevel === 'PUBLIC' ||
    (permissionLevel === 'OWNER' && accessLevel !== 'nobody')

  const resolveBadge = (): Badge | null => {
    if (permissionLevel === 'NEW') {
      return {
        color: 'text.disabled',
        label: 'New',
      }
    }

    if (['OWNER', 'SHARED', 'PUBLIC'].includes(permissionLevel)) {
      return {
        color: isShared ? 'success.main' : theme.color.accent,
        label: isShared ? resolveSharedLabel() : 'Saved',
      }
    }

    return null
  }

  const badge = resolveBadge()

  if (badge === null) {
    return null
  }

  const isClickable = permissionLevel === 'OWNER'

  return (
    <Tooltip title={isClickable ? 'Share / manage access' : 'Document status'}>
      <Box
        onClick={isClickable ? openShareQuotationModal : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '13px',
          fontWeight: 500,
          color: badge.color,
          userSelect: 'none',
          cursor: isClickable ? 'pointer' : 'default',
          '&:hover .badge-share-icon': { opacity: 1 },
        }}
      >
        <Box
          sx={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            bgcolor: badge.color,
            flexShrink: 0,
          }}
        />
        {badge.label}
        {isClickable && (
          <Box
            className='badge-share-icon'
            sx={{
              opacity: 0,
              transition: 'opacity 0.15s',
              lineHeight: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PiShare size={13} />
          </Box>
        )}
      </Box>
    </Tooltip>
  )
}
