import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openShareQuotationOrLoginModal = (): void => {
  if (reduxHolder.getState().user.email === null) {
    routerHolder.router.navigate(
      `./${route.login}${buildSearchParams({ redirect: route.share, shouldSlide: 'true' })}`,
    )

    return
  }

  routerHolder.router.navigate(`./${route.share}`)
}
