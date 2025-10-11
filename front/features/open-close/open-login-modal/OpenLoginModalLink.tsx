import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch } from '@shared/lib/redux'
import type { JSX, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenLoginModalLink = ({ slideOut }: Props): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      onClick={(event: MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await slideOut()
          dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))
          void navigate(`../${route.login}`)
        }

        void slideAndNavigate()
      }}
      to={`../${route.login}`}
    >
      Log in
    </Link>
  )
}
