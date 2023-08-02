import { store } from 'client/shared/clients'
import { resetMsgOnBottom, showMsgOnBottom } from 'client/shared/ui/bottom_msg'

export const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  store.dispatch(showMsgOnBottom('saved locally'))
  setTimeout(() => {
    store.dispatch(resetMsgOnBottom())
  }, ms)
}