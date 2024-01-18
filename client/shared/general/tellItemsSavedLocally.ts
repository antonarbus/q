import { dispatch } from '@libras/store'
import { generalSlice } from './generalSlice'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(generalSlice.actions.showBottomMsg('saved locally'))
  setTimeout(() => {
    dispatch(generalSlice.actions.hideBottomMsg())
  }, ms)
}
