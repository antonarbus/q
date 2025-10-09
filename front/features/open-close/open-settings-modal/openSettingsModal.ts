import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'

export const openSettingsModal = (): void => {
  void router.navigate(`./${route.settings}`)
}
