import { router } from '@shared/lib/react-router-dom'
import { backToQuotationRef } from '@entities/quotation'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openQuotationPageAndLoadPrev = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'memory',
    }),
  )

  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
