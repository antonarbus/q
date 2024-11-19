import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { useSlide } from '@shared/utils/useSlide'
import { openRegisterModal } from './openRegisterModal'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
}

export const OpenRegisterModalLink = ({
  modalRef,
}: Props): React.JSX.Element => {
  return (
    <Link
      to={`../${route.register}`}
      style={{ textAlign: 'right' }}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()

        useSlide({
          element: modalRef.current,
          onSlideOutComplete: openRegisterModal,
        })
      }}
    >
      Register
    </Link>
  )
}
