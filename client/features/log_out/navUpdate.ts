import { dispatch } from '@libras/store'
import { navSlice } from '@entities/nav'

export const navUpdate = {
  login: (): void => {
    dispatch(navSlice.actions.hideLogInMenuItem())
    dispatch(navSlice.actions.showAccountMenuItem())
  },
  logout: (): void => {
    dispatch(navSlice.actions.showLogInMenuItem())
    dispatch(navSlice.actions.hideAccountMenuItem())
  },
}
