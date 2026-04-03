import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce } from 'react-use'

export const useResetQuotationOnNavigationButtonClick = (): void => {
  useEffectOnce(() => {
    const resetQuotationOnPopState = (): void => {
      reduxHolder.dispatch(
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
