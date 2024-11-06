import { instance } from '@shared/instance'
import { route } from '@shared/consts/route'

export const openSettingsModal = (): void => {
  void instance.router.navigate(`./${route.settings}`)
}
