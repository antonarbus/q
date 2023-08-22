import { dispatch, store } from 'client/shared/clients'
import { bottomMsgSlice } from 'client/shared/ui/bottom_msg'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  dispatch(bottomMsgSlice.actions.showMsgOnBottom('saved locally'))
  setTimeout(() => {
    dispatch(bottomMsgSlice.actions.resetMsgOnBottom())
  }, ms)
}