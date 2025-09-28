import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/const/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'
import type { JSX, MouseEvent } from 'react'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenResetModalLink = ({ slideOut }: Props): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      onClick={(event: MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await slideOut()
          dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))
          void navigate(`../${route.requestPasswordReset}`)
        }

        void slideAndNavigate()
      }}
      to={`../${route.requestPasswordReset}`}
    >
      Reset
    </Link>
  )
}
