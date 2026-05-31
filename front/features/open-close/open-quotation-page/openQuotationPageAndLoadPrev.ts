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

  reduxHolder.dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: draftId === null ? 'server' : 'memory',
    }),
  )

  const targetId = draftId ?? backId

  routerHolder.router.navigate(targetId && targetId !== 'new' ? `/${targetId}` : route.root)
}
