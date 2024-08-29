import { Link, useNavigate } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import type { NavigateState } from '@shared/types/NavigateState'

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

        const navigateState: NavigateState = {
          shouldSlide: true,
          scrollTop:
            document.documentElement.scrollTop || document.body.scrollTop,
        }

        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate(`../${route.requestPasswordReset}`, {
              state: navigateState,
            })
          },
        })
      }}
    >
      Reset
    </Link>
  )
}
