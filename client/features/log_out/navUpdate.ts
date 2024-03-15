import { dispatch } from '@lib_instances/store'
import { navSlice } from '@shared/nav'

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
