import { appSlice } from '@entities/app'
import { dispatch } from '@shared/clients'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(appSlice.actions.showBottomMsg('saved locally'))
  setTimeout(() => {
    dispatch(appSlice.actions.hideBottomMsg())
  }, ms)
}
