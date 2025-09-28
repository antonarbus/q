import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/const/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'
import type { JSX,MouseEvent } from 'react'

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
