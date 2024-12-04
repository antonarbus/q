import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenResetModalLink = ({ slideOut }: Props): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      to={`../${route.requestPasswordReset}`}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()

        const navigateState: NavigateState = {
          shouldSlide: true,
        }

        const slideAndNavigate = async (): Promise<void> => {
          await slideOut()

          void navigate(`../${route.requestPasswordReset}`, {
            state: navigateState,
          })
        }

        void slideAndNavigate()
      }}
    >
      Reset
    </Link>
  )
}
