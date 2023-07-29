import { hideAccountMenuItem, hideLogInMenuItem, showAccountMenuItem, showLogInMenuItem } from 'client/features/nav/navSlice'
import { store } from 'client/app/store'

export const navUpdate = {
  login: () => {
    store.dispatch(hideLogInMenuItem())
    store.dispatch(showAccountMenuItem())
  },
  logout: () => {
    store.dispatch(showLogInMenuItem())
    store.dispatch(hideAccountMenuItem())
  },
}
