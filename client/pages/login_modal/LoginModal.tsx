import { dispatch } from '@lib_instances/store'
import { LoginRounded } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { MouseEvent } from 'react'
import { useCallback, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { OpenRegisterModalLink, openRegisterModal } from '@features/open_close/open_register_modal'
import { useGetItemsQuery } from '@entities/item'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { EmailField, FormModal, PasswordField } from '@shared/components'
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
  const modalRef = useRef<HTMLDivElement>(null)
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

      if (location.pathname.includes(route.bookmarks)) {
        void refetchItems()
      }

      if (id) {
        reRenderQuotationSignal.value = nanoid(5)
      }

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
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

  const onSlideModalOutComplete = useCallback(() => {
    navigate('..')
  }, [])

  const onCloseClick = useCallback(() => {
    slideElement({
      element: modalRef.current,
      onSlideElementComplete: () => {
        navigate('..')
      },
    })
  }, [])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    logIn({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Log in'
      headerIcon={<LoginRounded />}
      buttonText='LOG IN'
      isButtonDisabled={!isEmailOkSignal.value || passwordSignal.value === '' || isPending}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSlideModalOutComplete={onSlideModalOutComplete}
      onSubmit={onSubmit}
      onCloseClick={onCloseClick}
    >
      <EmailField
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField
        passwordSignal={passwordSignal}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to={`../${route.requestPasswordReset}`}
          onClick={(e: MouseEvent): void => {
            e.preventDefault()
            if (!modalRef.current) return
            slideElement({
              element: modalRef.current,
              onSlideElementComplete: () => {
                navigate(`../${route.requestPasswordReset}`)
              },
            })
          }}
        >
          Reset
        </Link>
        <OpenRegisterModalLink modalRef={modalRef} />
      </Box>
    </FormModal>
  )
}
