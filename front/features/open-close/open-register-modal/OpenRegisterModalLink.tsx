import { route } from '@shared/const/route'
import type { JSX, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { openRegisterModal } from './openRegisterModal'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenRegisterModalLink = ({ slideOut }: Props): JSX.Element => {
  return (
    <Link
      onClick={(event: MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await slideOut()
          openRegisterModal()
        }

        void slideAndNavigate()
      }}
      style={{ textAlign: 'right' }}
      to={`../${route.register}`}
    >
      Register
    </Link>
  )
}
