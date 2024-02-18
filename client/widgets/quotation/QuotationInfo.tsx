import { useSelectorTyped } from '@lib_instances/store'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): JSX.Element => {
  const quotationId = useSelectorTyped(state => state.quotation.id)

  return (
    <QuotationInfoLayout
      quotationId={quotationId}
      onClick={() => {
        alert('show popup with all info with proper route')
      }}
    />
  )
}
