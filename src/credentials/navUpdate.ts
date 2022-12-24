import { setPropValueByIdInNavStructure } from '@src/nav/navSlice'
import { store } from '@src/store'

export const navUpdate = {
  login: () => {
    store.dispatch(setPropValueByIdInNavStructure({ id: 'logIn', prop: 'isHidden', value: true }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'account', prop: 'isHidden', value: false }))
  },
  logout: () => {
    store.dispatch(setPropValueByIdInNavStructure({ id: 'logIn', prop: 'isHidden', value: false }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'account', prop: 'isHidden', value: true }))
  }
}
