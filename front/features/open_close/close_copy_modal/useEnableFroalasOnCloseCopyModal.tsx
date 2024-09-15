import { quotationSlice } from '@entities/quotation'
import { dispatch } from '@lib_instances/store'
import { useUnmount } from 'react-use'

export const useEnableFroalasOnCloseCopyModal = (): void => {
  useUnmount(() => {
    dispatch(quotationSlice.actions.enableFroalaReducer())
  })
}
