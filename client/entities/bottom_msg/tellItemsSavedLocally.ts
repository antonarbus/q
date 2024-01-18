import { generalSlice } from '@entities/general' // todo: not good
import { dispatch } from '@shared/clients'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(generalSlice.actions.showBottomMsg('saved locally'))
  setTimeout(() => {
    dispatch(generalSlice.actions.hideBottomMsg())
  }, ms)
}
