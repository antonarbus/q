import { router } from '@lib_instances/Router'

export const logIn = (): void => {
  void router.navigate('./login')
}
