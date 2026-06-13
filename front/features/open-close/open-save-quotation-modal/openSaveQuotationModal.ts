import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openSaveQuotationModal = (): void => {
  if (reduxHolder.getState().user.email === null) {
    void routerHolder.router.navigate(
      `./${route.login}${buildSearchParams({ redirect: route.save, shouldSlide: 'true' })}`,
    )

    return
  }

  void routerHolder.router.navigate(`./${route.save}`)
}
