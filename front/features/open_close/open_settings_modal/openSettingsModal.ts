import { router } from '@lib_instances/router_'
import { route } from '@shared/consts/route'

export const openSettingsModal = (): void => {
  void router.navigate(`./${route.settings}`)
}
