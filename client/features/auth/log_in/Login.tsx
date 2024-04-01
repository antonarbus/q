import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { LoginRounded } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetQuotationQuery, useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { mutate: logIn, isPending, data, isSuccess, isError, error } = useLogInMutation()
  const { refetch: refetchQuotation } = useGetQuotationQuery()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()

  useUpdateEffect(() => {
    if (!isSuccess) return

    const { accessJwtToken, email, roles, message } = data

    if (message !== 'good password') return
    if (!accessJwtToken) return
    if (!email) return
    if (!roles) return

    accessTokenSignal.value = accessJwtToken
    dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
    dispatch(navSlice.actions.hideLogInMenuItem())
    dispatch(navSlice.actions.showAccountMenuItem())

    if (location.pathname.includes(route.quotations)) {
      void refetchQuotations()
    }

    if (id) {
      void refetchQuotation()
    }

    setTimeout(() => {
      slideElement({
        element: cardRef.current,
        cb: () => {
          navigate('..', { replace: true, state: nanoid() })
        },
      })
    }, 2500)
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

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
  }, [isError])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={() => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Log in'
        logo={
          <Avatar
            sx={{ m: 1, bgcolor: theme.colors.darkBackground }}
          >
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
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
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
                  cb: () => {
                    navigate(`../${route.requestPasswordReset}`)
                  },
                })
              }}
            >
              Reset?
            </Link>
            <Link
              to={`../${route.register}`}
              css={{ textAlign: 'right' }}
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  cb: () => {
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
    </BackdropWithSlidableContent>
  )
}
