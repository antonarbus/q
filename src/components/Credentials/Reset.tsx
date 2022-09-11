import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, TextField } from '@mui/material'
import { BackdropCustom } from '@components/Common/BackdropCustom'
import { CardCustom } from '@components/Common/CardCustom'
import { slideElement } from '@functions/slideElement'
import { useEffectOnce } from 'react-use'
import { ButtonCustom } from '@components/Common/ButtonCustom'
import { useReset } from './useReset'
import { EventType } from '@src/types'
import { EmailInput } from './common/EmailInput'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'

export function Reset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { resetPassword, httpStatus, setHttpStatus } = useReset()
  const [isEmailOk, setIsEmailOk] = useState(false)

  // todo: probably add slide element prop right into BackdropCustom component

  useEffectOnce(() => slideElement({ intoView: true, element: cardRef.current, cb: () => inputRef.current.focus() }))

  return (
    <BackdropCustom
      onMouseDown={() => slideElement({ element: cardRef.current, cb: () => navigate('/') })}
    >
      <CardCustom
        reference={cardRef}
        title='Reset password'
        logo={<Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}><LockOutlined /></Avatar>}
      >
        <form onSubmit={(e: EventType) => resetPassword({ e, email })}>
          <EmailInput email={email} setEmail={setEmail} isEmailOk={isEmailOk} setIsEmailOk={setIsEmailOk} inputRef={inputRef}/>
          <ButtonCustom content='RESET' disabled={!isEmailOk} httpStatus={httpStatus} setHttpStatus={setHttpStatus} />
        </form>
      </CardCustom>
    </BackdropCustom>
  )
}
