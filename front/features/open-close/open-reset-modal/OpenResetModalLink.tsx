import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch } from '@shared/lib/redux'
import type { JSX, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
