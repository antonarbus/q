import { AppThunk } from 'client/app/store'
import { resetMsgOnBottom, showMsgOnBottom } from 'client/entities/bottomMsg'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): AppThunk => (dispatch) => {
  dispatch(showMsgOnBottom('saved locally'))
  setTimeout(() => {
    dispatch(resetMsgOnBottom())
  }, ms)
}