import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { appSlice } from '@front/shared/appSlice'
import { router } from '@front/shared/lib/react-router-dom/router'
import { dispatch } from '@front/shared/lib/redux'

export const openQuotationPageAndLoadPrev = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'memory',
    }),
  )

  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
