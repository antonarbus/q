import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import { openRegisterModal } from './openRegisterModal'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
}

export const OpenRegisterModalLink = ({ modalRef }: Props): JSX.Element => {
  return (
    <Link
      to={`../${route.register}`}
      style={{ textAlign: 'right' }}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: openRegisterModal,
        })
      }}
    >
      Register
    </Link>
  )
}
