import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/const/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenResetModalLink = ({ slideOut }: Props): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      onClick={(event: React.MouseEvent): void => {
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
