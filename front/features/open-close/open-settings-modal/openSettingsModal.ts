import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'

export const openSettingsModal = (): void => {
  routerHolder.router.navigate(`./${route.settings}`)
}
