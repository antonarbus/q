import { useActivate } from '@feature/auth/activate-user/useActivate'
import { Avatar, Box } from '@mui/material'
import { BackdropWithSlidableModal } from '@shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@shared/component/CardCustom'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { theme } from '@shared/theme'
import { useRef } from 'react'
import { GrValidate } from 'react-icons/gr'
import { PiSmileyBold, PiSmileySadBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

export const ActivationModal = (): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const activate = useActivate()

  return (
    <BackdropWithSlidableModal
      onUnmount={(): void => {
        void navigate('..')
      }}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
    >
      <CardCustom
        logo={
          <Avatar sx={{ margin: 1, bgcolor: theme.colors.darkBackground }}>
            <GrValidate />
          </Avatar>
        }
        reference={cardRef}
        title='Activation'
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
          {activate.isPending === true ? (
            <>
              <RotatingLoaderIcon
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Please wait...</Box>
            </>
          ) : null}
          {activate.isSuccess === true ? (
            <>
              <PiSmileyBold
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Activated</Box>
            </>
          ) : null}
          {activate.isError === true ? (
            <>
              <PiSmileySadBold
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Something went wrong</Box>
            </>
          ) : null}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
