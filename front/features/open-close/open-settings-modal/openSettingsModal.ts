import { route } from '@front/shared/lib/react-router-dom/route'
import { router } from '@front/shared/lib/react-router-dom/router'

export const openSettingsModal = (): void => {
  void router.navigate(`./${route.settings}`)
}
