import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { LoginRounded } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemsQuery } from '@entities/item'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const LoginModal = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { mutate: logIn, isPending, data, isSuccess, isError, error } = useLogInMutation()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchItems } = useGetItemsQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { accessJwtToken, email, roles, message } = data

      if (data.name === 'MongooseError') {
        notify({ msg: 'Database error', type: 'warn', theme: 'light' })
        return
      }

      if (message !== 'good password') return
      if (!accessJwtToken) return
      if (!email) return
      if (!roles) return

      accessTokenSignal.value = accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
      dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }))
      dispatch(navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }))

      if (location.pathname.includes(route.quotations)) {
        void refetchQuotations()
      }

      if (location.pathname.includes(route.items)) {
        void refetchItems()
      }

      if (id) {
        reRenderQuotationSignal.value = nanoid(5)
      }

      setTimeout(() => {
        slideElement({
          element: cardRef.current,
          onSlideElementComplete: () => {
            navigate('..', { replace: true, state: nanoid() })
          },
        })
      }, 1500)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      accessTokenSignal.value = null

      if (error.response?.data.message === 'bad password') {
        notify({ msg: 'Invalid credentials', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'not activated') {
        notify({ msg: 'Account is not activated. Check mailbox.', type: 'info', theme: 'light' })
        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  return (
    <BackdropWithSlidableModal
      onSlideModalInComplete={() => {
        /* inputRef.current.focus() */
      }}
      onSlideModalOutComplete={() => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Log in'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }} >
            <LoginRounded />
          </Avatar>
        }
      >
        <form
          onSubmit={(e: FormEvent): void => {
            e.preventDefault()

            logIn({
              email: emailSignal.value,
              password: passwordSignal.value,
            })
          }}
        >
          <EmailInput
            inputRef={inputRef}
            emailSignal={emailSignal}
            isEmailOkSignal={isEmailOkSignal}
          />
          <PasswordInput
            passwordSignal={passwordSignal}
          />
          <ButtonCustom
            disabled={!isEmailOkSignal.value || passwordSignal.value === '' || isPending}
            isButtonPending={isPending}
            isButtonSuccess={isSuccess}
            isButtonError={isError}
          >
            LOG IN
          </ButtonCustom>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Link
              to={`../${route.requestPasswordReset}`}
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                if (!cardRef.current) return
                slideElement({
                  element: cardRef.current,
                  onSlideElementComplete: () => {
                    navigate(`../${route.requestPasswordReset}`)
                  },
                })
              }}
            >
              Reset password?
            </Link>
            <Link
              to={`../${route.register}`}
              style={{ textAlign: 'right' }}
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  onSlideElementComplete: () => {
                    navigate(`../${route.register}`)
                  },
                })
              }}
            >
              Register?
            </Link>
          </Box>
        </form>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
