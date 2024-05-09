import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar, Box } from '@mui/material'
import { useRef } from 'react'
import { GrValidate } from 'react-icons/gr'
import { PiSmileySadBold, PiSmileyBold } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useActivateMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { RotatingLoaderIcon } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { CardCustom } from '@shared/components/CardCustom'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

export const ActivationModal = (): JSX.Element => {
  const { activationKey } = useParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { mutate: activate, isPending, data, isSuccess, isError, error } = useActivateMutation()

  useEffectOnce(() => {
    if (activationKey === undefined) return
    activate({ activationKey })
  })

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.message === 'activated') {
      notify({ msg: 'Activated', theme: 'light' })

      const { accessJwtToken, email, roles } = data

      if (!accessJwtToken) return
      if (!email) return
      if (!roles) return

      accessTokenSignal.value = accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
      dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }))
      dispatch(navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }))
    }

    if (data.message === 'already activated') {
      notify({ msg: 'Already activated', type: 'info', theme: 'light' })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'activation key not found') {
      notify({ msg: 'Activation key not found', type: 'warn', theme: 'light' })
      return
    }

    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  }, [isError])

  return (
    <BackdropWithSlidableContent
      shouldSlideIn={false}
      onSlideOut={(): void => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Activation'
        logo={
          <Avatar
            sx={{ m: 1, bgcolor: theme.colors.darkBackground }}
          >
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
              <Box>Please wait</Box>
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
    </BackdropWithSlidableContent>
  )
}
