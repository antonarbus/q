import { store } from 'client/app/store'

// eslint-disable-next-line @typescript-eslint/unbound-method
export const getState = store.getState
export const dispatch = store.dispatch
export { store }

export { theme } from 'client/app/theme'
export { reactQuery } from 'client/app/reactQuery'
