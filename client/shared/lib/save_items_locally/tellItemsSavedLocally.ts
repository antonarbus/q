import { appSlice } from 'client/entities/app'
import { dispatch } from 'client/shared/clients'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(appSlice.actions.showBottomMsg('saved locally'))
  setTimeout(() => {
    dispatch(appSlice.actions.hideBottomMsg())
  }, ms)
}
