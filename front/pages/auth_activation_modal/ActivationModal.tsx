import { theme } from '@lib_instances/theme'
import { Avatar, Box } from '@mui/material'
import { useRef } from 'react'
import { GrValidate } from 'react-icons/gr'
import { PiSmileySadBold, PiSmileyBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useActivate } from '@features/auth/activate'
import { RotatingLoaderIcon } from '@shared/components'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'

export const ActivationModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isSuccess, isPending, isError } = useActivate()

  return (
    <BackdropWithSlidableModal
      shouldSlide={false}
      onClose={(): void => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Activation'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <GrValidate />
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
          {isError && (
            <>
              <PiSmileySadBold
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Something went wrong</Box>
            </>
          )}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
