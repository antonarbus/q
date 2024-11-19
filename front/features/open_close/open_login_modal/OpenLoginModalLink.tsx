import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { useSlide } from '@shared/utils/useSlide'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
}

export const OpenLoginModalLink = ({ modalRef }: Props): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      to={`../${route.login}`}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()

        const navigateState: NavigateState = {
          shouldSlide: true,
        }

        useSlide({
          element: modalRef.current,
          onSlideOutComplete: () => {
            navigate(`../${route.login}`, {
              state: navigateState,
            })
          },
        })
      }}
    >
      Log in
    </Link>
  )
}
