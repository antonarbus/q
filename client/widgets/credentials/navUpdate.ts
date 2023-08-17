import { hideAccountMenuItem, hideLogInMenuItem, showAccountMenuItem, showLogInMenuItem } from 'client/entities/nav'
import { store } from 'client/app/store'

export const navUpdate = {
  login: (): void => {
    store.dispatch(hideLogInMenuItem())
    store.dispatch(showAccountMenuItem())
  },
  logout: (): void => {
    store.dispatch(showLogInMenuItem())
    store.dispatch(hideAccountMenuItem())
  },
}
