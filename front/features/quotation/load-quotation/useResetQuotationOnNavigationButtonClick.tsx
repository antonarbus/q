import { resolveQuotationLoadSourceFromUrl } from '@front/entities/quotation/resolveQuotationLoadSource'
import { appSlice } from '@front/shared/appSlice'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { NavigationType } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

export const useResetQuotationOnNavigationButtonClick = (): void => {
  useEffectOnce(() => {
    // Subscribing to the router (rather than a raw `popstate` listener) gives us
    // state.matches already resolved by the router at notification time — unlike
    // useParams(), which can lag this event by a render, this can't race.
    const unsubscribe = routerHolder.router.subscribe((state) => {
      if (state.historyAction !== NavigationType.Pop) {
        return
      }

      const urlQuotationId = state.matches.at(-1)?.params.quotationId

      const quotationLoadSourceFromUrl = resolveQuotationLoadSourceFromUrl({ urlQuotationId })

      reduxHolder.dispatch(
        appSlice.actions.setQuotationLoadRequest({
          status: 'pending',
          source: quotationLoadSourceFromUrl.source,
          isModifiedDraft: quotationLoadSourceFromUrl.isModifiedDraft,
        }),
      )
    })

    return unsubscribe
  })
}
