import { quotationSlice } from '@entities/quotation'
import { dispatch } from '@shared/lib/redux'
import { useUnmount } from 'react-use'

export const useEnableFroalasOnCloseCopyModal = (): void => {
  useUnmount(() => {
    dispatch(quotationSlice.actions.enableFroalaReducer())
  })
}
