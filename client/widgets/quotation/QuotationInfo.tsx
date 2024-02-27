import { quotationSignal } from '@client/entities/quotation'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): JSX.Element => {
  return (
    <QuotationInfoLayout
      quotationId={quotationSignal.value.id ?? 'local version'}
      onClick={() => {
        alert('show popup with all info with proper route')
      }}
    />
  )
}
