import { appSlice } from '@shared/appSlice'
import { dispatch } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

export const useResetQuotationOnNavigationButtonClick = (): void => {
  useEffectOnce(() => {
    const resetQuotationOnPopState = (): void => {
      dispatch(
        appSlice.actions.setShouldLoadQuotation({
          yesOrNo: 'yes',
          from: undefined,
        }),
      )
    }

    window.addEventListener('popstate', resetQuotationOnPopState)

    return (): void => {
      window.removeEventListener('popstate', resetQuotationOnPopState)
    }
  })
}
