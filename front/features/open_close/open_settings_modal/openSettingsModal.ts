import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'

export const openSettingsModal = (): void => {
  void router.navigate(`./${route.settings}`)
}
