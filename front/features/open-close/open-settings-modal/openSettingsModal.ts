import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'

export const openSettingsModal = (): void => {
  void routerHolder.router.navigate(`./${route.settings}`)
}
