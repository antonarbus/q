import { router } from '@lib_instances/Router'

// todo: combine login logic here, for ex. nav bar changes can be here, accessToken assignment can be here etc...

export const logIn = (): void => {
  void router.navigate('./login')
}
