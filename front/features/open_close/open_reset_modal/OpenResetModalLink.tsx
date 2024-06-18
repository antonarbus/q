import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
}

export const OpenResetModalLink = ({ modalRef }: Props): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      to={`../${route.requestPasswordReset}`}
      onClick={(e: React.MouseEvent): void => {
        e.preventDefault()
        if (!modalRef.current) return
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate(`../${route.requestPasswordReset}`)
          },
        })
      }}
    >
      Reset
    </Link>
  )
}
