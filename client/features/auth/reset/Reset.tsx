import { theme } from '@lib_instances/theme'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import { Avatar, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmailInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import { useReset } from './useReset'

export const Reset = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const emailSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { resetPassword } = useReset()

  return (
    <BackdropWithSlidableContent
      onSlideIn={(): void => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={(): void => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Reset password'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <PasswordRoundedIcon />
          </Avatar>
        }
      >
        <form
          onSubmit={async (e: FormEvent): Promise<void> => {
            await resetPassword({ e, email: emailSignal.value })
          }}
        >
          <EmailInput
            inputRef={inputRef}
            emailSignal={emailSignal}
            isEmailOkSignal={isEmailOkSignal}
          />
          <ButtonCustom
            disabled={!isEmailOkSignal.value}
          >
            RESET
          </ButtonCustom>
          <Box
            sx={{ textAlign: 'right', marginTop: '20px' }}
          >
            <Link
              to={`../${route.login}`}
              onClick={(e: MouseEvent): void => {
                if (!cardRef.current) return
                e.preventDefault()

                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate(`../${route.login}`)
                  },
                })
              }}
            >
              Log in?
            </Link>
          </Box>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
