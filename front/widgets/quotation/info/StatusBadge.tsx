import { Box, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'

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

  return (
    <Tooltip title='Document status'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '11px',
          fontWeight: 500,
          color: badge.color,
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: badge.color,
            flexShrink: 0,
          }}
        />
        {badge.label}
      </Box>
    </Tooltip>
  )
}
