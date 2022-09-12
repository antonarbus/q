import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BackdropWithSlidableContent } from '@components/Common/BackdropWithSlidableContent'
import { CardCustom } from '@components/Common/CardCustom'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { ButtonCustom } from '@components/Common/ButtonCustom'

// todo: store user data in redux
// todo: complete Logout component

export function Logout() {
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { logoutUser, httpStatus, setHttpStatus } = useLogout()
  const navigate = useNavigate()

  return (
    <BackdropWithSlidableContent
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Log out"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LockOutlined />
          </Avatar>
        }
        reference={cardRef}
      >
        <ButtonCustom
          content="LOG OUT"
          disabled={false}
          httpStatus={httpStatus}
          setHttpStatus={setHttpStatus}
        />
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
