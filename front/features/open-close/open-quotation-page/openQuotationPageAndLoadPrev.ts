import { backQuotationStorage } from '@front/entities/quotation/storage/backQuotationStorage'
import { appSlice } from '@front/shared/appSlice'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationPageAndLoadPrev = (): void => {
  const quotation = backQuotationStorage.load()

  reduxHolder.dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'memory',
    }),
  )

  routerHolder.router.navigate(`/${quotation?.id ?? 'new'}`)
}
