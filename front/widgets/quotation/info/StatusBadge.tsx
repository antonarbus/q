import { Box, Tooltip } from '@mui/material'
import { openSaveQuotationModal } from '@front/features/open-close/open-save-quotation-modal'
import { openShareQuotationModal } from '@front/features/open-close/open-share-quotation-modal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { FiSave } from 'react-icons/fi'
import { PiShare } from 'react-icons/pi'
import type { FC } from 'react'

export const StatusBadge: FC = () => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)
  const accessLevel = reduxHolder.useSelector((state) => state.quotation.access.level)
  const isModified = reduxHolder.useSelector((state) => state.app.isModified)

  const resolveStatusLabel = (): 'Public' | 'Shared' => {
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

  type Badge = {
    color: string
    label: string
  }

  const resolveBadge = (): Badge | null => {
    if (permissionLevel === 'NEW') {
      if (isModified) {
        return { color: 'warning.main', label: 'Edited' }
      }

      return {
        color: 'text.disabled',
        label: 'New',
      }
    }

    if (['OWNER', 'SHARED', 'PUBLIC'].includes(permissionLevel)) {
      if (isModified) {
        return { color: 'warning.main', label: 'Edited' }
      }

      return {
        color: isShared ? 'success.main' : theme.color.accent,
        label: isShared ? resolveStatusLabel() : 'Saved',
      }
    }

    return null
  }

  const badge = resolveBadge()

  if (badge === null) {
    return null
  }

  type ClickConfig = {
    onClick: () => void
    icon: React.ReactNode
    tooltip: string
  }

  const resolveClickConfig = (): ClickConfig | null => {
    if (permissionLevel === 'NEW') {
      return {
        onClick: openSaveQuotationModal,
        icon: <FiSave size={13} />,
        tooltip: 'Save',
      }
    }

    if (permissionLevel === 'OWNER' && isModified) {
      return {
        onClick: openSaveQuotationModal,
        icon: <FiSave size={13} />,
        tooltip: 'Save changes',
      }
    }

    if (permissionLevel === 'OWNER') {
      return {
        onClick: openShareQuotationModal,
        icon: <PiShare size={13} />,
        tooltip: 'Share',
      }
    }

    return null
  }

  const clickConfig = resolveClickConfig()

  return (
    <Tooltip title={clickConfig === null ? 'Document status' : clickConfig.tooltip}>
      <Box
        onClick={clickConfig?.onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '13px',
          fontWeight: 500,
          color: badge.color,
          userSelect: 'none',
          cursor: clickConfig === null ? 'default' : 'pointer',
          '&:hover .badge-action-icon': {
            opacity: 1,
          },
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
        {clickConfig !== null && (
          <Box
            className='badge-action-icon'
            sx={{
              opacity: 0,
              transition: 'opacity 0.15s',
              lineHeight: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {clickConfig.icon}
          </Box>
        )}
      </Box>
    </Tooltip>
  )
}
