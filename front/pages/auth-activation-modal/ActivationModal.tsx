import { theme } from '@shared/theme'
import { Avatar, Box } from '@mui/material'
import { useRef, type JSX } from 'react'
import { GrValidate } from 'react-icons/gr'
import { PiSmileySadBold, PiSmileyBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useActivate } from '@features/auth/activate'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { BackdropWithSlidableModal } from '@shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@shared/component/CardCustom'

export const ActivationModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isSuccess, isPending, isError } = useActivate()

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
          {isPending === true ? (
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
          {isSuccess === true ? (
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
          {isError === true ? (
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
