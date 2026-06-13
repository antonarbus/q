import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'

type Props = {
  prefilledEmail: string
}

export const openRegisterModal = (props: Props): void => {
  void routerHolder.router.navigate(
    `../${route.register}${buildSearchParams({ shouldSlide: 'true', prefilledEmail: props.prefilledEmail })}`,
  )
}
