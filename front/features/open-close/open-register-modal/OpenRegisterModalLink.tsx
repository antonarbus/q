import { route } from '@front/shared/lib/react-router-dom/route'
import { Link } from 'react-router-dom'
import { openRegisterModal } from './openRegisterModal'

type Props = {
  prefilledEmail: string
  slideOut: () => Promise<void>
}

export const OpenRegisterModalLink = (props: Props): React.JSX.Element => {
  return (
    <Link
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await props.slideOut()
          openRegisterModal({ prefilledEmail: props.prefilledEmail })
        }

        slideAndNavigate()
      }}
      style={{ textAlign: 'right' }}
      to={`../${route.register}`}
    >
      Register
    </Link>
  )
}
