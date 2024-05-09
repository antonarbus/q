import { useSelectorTyped } from '@lib_instances/store'
import { type ReactNode } from 'react'
import { openQuotationInfoModal } from '@features/quotation/open_info_quotation_modal'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): ReactNode => {
  const id = useSelectorTyped(state => state.quotation.id)

  if (id === '' || id === undefined) return null

  return (
    <QuotationInfoLayout
      quotationId={id}
      onClick={() => {
        openQuotationInfoModal()
      }}
    />
  )
}
