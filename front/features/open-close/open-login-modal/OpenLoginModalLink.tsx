import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  slideOut: () => Promise<void>
}

export const OpenLoginModalLink = (props: Props): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <Link
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()

        const slideAndNavigate = async (): Promise<void> => {
          await props.slideOut()

          reduxHolder.dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))

          navigate(`../${route.login}`)
        }

        slideAndNavigate()
      }}
      to={`../${route.login}`}
    >
      Log in
    </Link>
  )
}
