import { draftQuotationStorage } from '@front/entities/quotation/storage/draftQuotationStorage'
import {
  clearBackQuotationId,
  getBackQuotationId,
} from '../../../entities/quotation/backQuotationId'
import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationPageAndLoadPrev = (): void => {
  const draftId = draftQuotationStorage.load()?.id
  const backId = getBackQuotationId()

  clearBackQuotationId()

  const targetId = draftId ?? backId
  const hasTargetId = targetId !== null && targetId !== '' && targetId !== 'new'

  const resolveFrom = (): 'memory' | 'server' | 'template' => {
    if (draftId !== undefined) {
      return 'memory'
    }

    if (hasTargetId) {
      return 'server'
    }

    return 'template'
  }

  const fromResolved = resolveFrom()

  reduxHolder.dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: fromResolved,
    }),
  )

  void routerHolder.router.navigate(hasTargetId ? `/${targetId}` : route.root)
}
