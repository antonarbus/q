import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch } from '@shared/lib/redux'
import { useUnmount } from 'react-use'

export const useEnableEditorsOnCloseCopyModal = (): void => {
  useUnmount(() => {
    dispatch(textSlice.actions.setEditable())
  })
}
