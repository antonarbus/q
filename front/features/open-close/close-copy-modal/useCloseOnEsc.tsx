import { copySlice } from '@entities/copy'
import { quotationSlice } from '@entities/quotation'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
      return
    }

    dispatch(copySlice.actions.hideCopyModal())
    dispatch(quotationSlice.actions.removePasteItemReducer())

    setTimeout(() => {
      dispatch(textSlice.actions.setEditable())
    }, 500)
  }

  type Res = () => void

  const listenForEsc = (): Res => {
    window.addEventListener('keydown', closeOnEsc)

    // cleanup
    return (): void => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
