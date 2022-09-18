import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BackdropWithSlidableContent } from '@components/Common/BackdropWithSlidableContent'
import { CardCustom } from '@components/Common/CardCustom'
import { theme } from '@src/theme'
import { LogoutRounded } from '@mui/icons-material'
import { ButtonCustom } from '@components/Common/ButtonCustom'
import { httpStatusType } from '@src/types'
import { slideElement } from '@functions/slideElement'
import { notify } from '@components/Notifier/notify'
import { forgetLoggedUser } from '@redux/slices/userSlice'
import { useDispatchTyped } from '@src/store'

// todo: store user data in redux
// todo: complete Logout component

export function Logout() {
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  // const { logoutUser, httpStatus, setHttpStatus } = useLogout()
  const navigate = useNavigate()
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')
  const dispatch = useDispatchTyped()

  async function logoutUser() {
    const method = 'GET'
    const options = { method }
    try {
      setHttpStatus('loading')
      const res = await fetch('/api/logout', options)
      const data = await res.json()
      const { status, message, email } = data
      if (status === 'error') {
        setHttpStatus('error')
        message === 'no refresh token in cookies' && notify({ msg: 'Already logged out before', type: 'info', theme: 'light' })
        message === 'no email in refresh token' && notify({ msg: 'No email in refresh token, smth is wrong', type: 'info', theme: 'light' })
        message === 'no user with such refresh token' && notify({ msg: 'No user with such refresh token', type: 'info', theme: 'light' })
      }
      if (status === 'ok') {
        setHttpStatus('success')
        notify({ msg: `User with ${email} is logged out`, type: 'success', theme: 'light' })
        dispatch(forgetLoggedUser())
      }
    } catch (err) {
      console.log(err)
      setHttpStatus('error')
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    } finally {
      localStorage.removeItem('accessJwtToken')
      setTimeout(() => slideElement({ element: cardRef.current, cb: () => navigate('/') }), 3000)
    }
  }

  return (
    <BackdropWithSlidableContent
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Log out"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LogoutRounded />
          </Avatar>
        }
        reference={cardRef}
      >
        <ButtonCustom
          content="LOG OUT"
          disabled={false}
          httpStatus={httpStatus}
          setHttpStatus={setHttpStatus}
          onClick={logoutUser}
        />
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
