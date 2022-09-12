import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BackdropWithSlidableContent } from '@components/Common/BackdropWithSlidableContent'
import { CardCustom } from '@components/Common/CardCustom'
import { theme } from '@src/theme'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { ButtonCustom } from '@components/Common/ButtonCustom'
import { httpStatusType } from '@src/types'
import { slideElement } from '@functions/slideElement'

// todo: store user data in redux
// todo: complete Logout component

export function Logout() {
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  // const { logoutUser, httpStatus, setHttpStatus } = useLogout()
  const navigate = useNavigate()
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

  function logout() {
    setHttpStatus('loading')
    localStorage.removeItem('accessJwtToken')
    // todo: logout from redux
    // todo: logout does not work, token comes back
    setHttpStatus('success')
    setTimeout(() => slideElement({ element: cardRef.current, cb: () => navigate('/') }), 3000)
  }

  return (
    <BackdropWithSlidableContent
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Log out"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LogoutRoundedIcon />
          </Avatar>
        }
        reference={cardRef}
      >
        <ButtonCustom
          content="LOG OUT"
          disabled={false}
          httpStatus={httpStatus}
          setHttpStatus={setHttpStatus}
          onClick={logout}
        />
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
