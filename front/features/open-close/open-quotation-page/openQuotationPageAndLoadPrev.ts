import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { appSlice } from '@front/shared/appSlice'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationPageAndLoadPrev = (): void => {
  reduxHolder.dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'memory',
    }),
  )

  routerHolder.router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
