import { setPropValueByIdInNavStructure } from '@features/nav/navSlice'
import { store } from '@src/store'

export const navUpdate = {
  login: () => {
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signIn', prop: 'isHidden', value: true }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signUp', prop: 'isHidden', value: true }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signOut', prop: 'isHidden', value: false }))
  },
  logout: () => {
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signIn', prop: 'isHidden', value: false }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signUp', prop: 'isHidden', value: false }))
    store.dispatch(setPropValueByIdInNavStructure({ id: 'signOut', prop: 'isHidden', value: true }))
  }
}
