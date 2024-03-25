import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { LoginRounded } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import type { FormEvent, MouseEvent } from 'react'
import { useState, useRef } from 'react'
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
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailOk, setIsEmailOk] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const { mutate: logIn, isPending, data, isSuccess, isError } = useLogInMutation()
  console.log('🚀 ~ isError:', isError)
  const { refetch: refetchQuotation } = useGetQuotationQuery()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()

  // useEffect(() => {
  //   setIsButtonDisabled(!isEmailOk || password === '')
  // }, [isEmailOk, password])

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.status === 'ok' && data.accessJwtToken) {
      accessTokenSignal.value = data.accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email: data.email, roles: data.roles }))
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
      }, 2000)

      return
    }

    if (data.status === 'error') {
      accessTokenSignal.value = null

      if (data.message === 'invalid credentials') {
        notify({ msg: 'Invalid credentials', type: 'error', theme: 'light' })
      }

      if (data.message === 'account is not activated') {
        notify({ msg: 'Account is not activated. Check mailbox.', type: 'error', theme: 'light' })
      }
    }
  }, [isSuccess])

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
            logIn({ email, password })
          }}
        >
          <EmailInput
            inputRef={inputRef}
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
          />
          <ButtonCustom
            children='LOG IN'
            disabled={!isEmailOk || password === '' || isPending}
            isPending={isPending}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Link
              to={`../${route.reset}`}
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                if (!cardRef.current) return
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate(`../${route.reset}`)
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
