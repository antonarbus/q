import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
}

export const OpenLoginModalLink = ({ modalRef }: Props): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      to={`../${route.login}`}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()

        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate(`../${route.login}`, {
              state: {
                shouldSlide: true,
              } as NavigateState,
            })
          },
        })
      }}
    >
      Log in
    </Link>
  )
}
