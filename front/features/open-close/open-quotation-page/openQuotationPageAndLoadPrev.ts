import { backToQuotationRef } from '@entities/quotation'
import { appSlice } from '@shared/appSlice'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch } from '@shared/lib/redux'

export const openQuotationPageAndLoadPrev = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'memory',
    }),
  )

  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
