import { dispatch } from '@shared/clients'
import { generalSlice } from '@shared/general'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(generalSlice.actions.showBottomMsg('saved locally'))
  setTimeout(() => {
    dispatch(generalSlice.actions.hideBottomMsg())
  }, ms)
}
