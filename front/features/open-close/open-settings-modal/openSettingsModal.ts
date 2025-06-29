import { router } from '@shared/lib/react-router-dom'
import { route } from '@shared/const/route'

export const openSettingsModal = (): void => {
  void router.navigate(`./${route.settings}`)
}
