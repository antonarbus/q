import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  prefilledEmail: string
  slideOut: () => Promise<void>
}

export const OpenResetModalLink = (props: Props): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await props.slideOut()

          navigate(
            `../${route.requestPasswordReset}${buildSearchParams({ shouldSlide: 'true', prefilledEmail: props.prefilledEmail })}`,
          )
        }

        slideAndNavigate()
      }}
      to={`../${route.requestPasswordReset}`}
    >
      Reset
    </Link>
  )
}
