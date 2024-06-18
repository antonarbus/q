import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'

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
            navigate(`../${route.login}`)
          },
        })
      }}
    >
      Log in
    </Link>
  )
}
