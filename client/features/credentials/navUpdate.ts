import { setNavItemProp } from 'client/features/nav/navSlice'
import { store } from 'client/store'

export const navUpdate = {
  login: () => {
    store.dispatch(setNavItemProp({ id: 'logIn', prop: 'isHidden', value: true }))
    store.dispatch(setNavItemProp({ id: 'account', prop: 'isHidden', value: false }))
  },
  logout: () => {
    store.dispatch(setNavItemProp({ id: 'logIn', prop: 'isHidden', value: false }))
    store.dispatch(setNavItemProp({ id: 'account', prop: 'isHidden', value: true }))
  }
}
