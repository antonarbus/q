import { quotationSignal } from '@client/entities/quotation'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): JSX.Element => {
  console.log(quotationSignal.value)

  return (
    <QuotationInfoLayout
      quotationId={quotationSignal.value.id}
      onClick={() => {
        alert('show popup with all info with proper route')
      }}
    />
  )
}
