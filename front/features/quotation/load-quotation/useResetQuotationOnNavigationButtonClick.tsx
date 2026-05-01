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

    globalThis.addEventListener('popstate', resetQuotationOnPopState)

    return (): void => {
      globalThis.removeEventListener('popstate', resetQuotationOnPopState)
    }
  })
}
