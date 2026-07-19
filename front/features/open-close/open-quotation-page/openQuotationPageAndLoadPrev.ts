import { clearBackQuotationId } from '../../../entities/quotation/backQuotationId'
import { resolveQuotationLoadSourceForBack } from '@front/entities/quotation/resolveQuotationLoadSource'
import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationPageAndLoadPrev = (): void => {
  const resolution = resolveQuotationLoadSourceForBack()

  clearBackQuotationId()

  reduxHolder.dispatch(
    appSlice.actions.setQuotationLoadRequest({
      status: 'pending',
      source: resolution.source,
      isModifiedDraft: resolution.isModifiedDraft,
    }),
  )

  void routerHolder.router.navigate(
    resolution.targetQuotationId === null ? route.root : `/${resolution.targetQuotationId}`,
  )
}
