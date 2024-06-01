import { getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Settings } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useRef } from 'react'
import { PiSmileyBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useActivate } from '@features/auth/activate'
import {
  BackdropWithSlidableModal,
  RotatingLoaderIcon,
} from '@shared/components'
import { CardCustom } from '@shared/components/CardCustom'

export const SettingsModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isSuccess, isPending } = useActivate()

  return (
    <BackdropWithSlidableModal
      shouldSlideIn={false}
      onSlideModalOutComplete={(): void => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title={getState().user.email}
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <Settings />
          </Avatar>
        }
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {isPending && (
            <>
              <RotatingLoaderIcon
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Please wait...</Box>
            </>
          )}
          {isSuccess && (
            <>
              <PiSmileyBold
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Activated</Box>
            </>
          )}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
