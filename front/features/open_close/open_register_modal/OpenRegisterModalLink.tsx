import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { openRegisterModal } from './openRegisterModal'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenRegisterModalLink = ({
  slideOut,
}: Props): React.JSX.Element => {
  return (
    <Link
      to={`../${route.register}`}
      style={{ textAlign: 'right' }}
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await slideOut()
          openRegisterModal()
        }

        void slideAndNavigate()
      }}
    >
      Register
    </Link>
  )
}
