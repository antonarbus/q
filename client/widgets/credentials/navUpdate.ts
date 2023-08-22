import { navSlice } from 'client/entities/nav'
import { store } from 'client/app/store'

export const navUpdate = {
  login: (): void => {
    store.dispatch(navSlice.actions.hideLogInMenuItem())
    store.dispatch(navSlice.actions.showAccountMenuItem())
  },
  logout: (): void => {
    store.dispatch(navSlice.actions.showLogInMenuItem())
    store.dispatch(navSlice.actions.hideAccountMenuItem())
  },
}
