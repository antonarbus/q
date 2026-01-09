import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'
import { useUnmount } from 'react-use'

export const useEnableFroalasOnCloseCopyModal = (): void => {
  useUnmount(() => {
    dispatch(quotationSlice.actions.enableFroalaReducer())
  })
}
