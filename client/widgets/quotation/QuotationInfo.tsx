import { quotationSignal } from '@client/entities/quotation'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): JSX.Element => {
  const { id } = quotationSignal.value

  return (
    <QuotationInfoLayout
      quotationId={id ?? 'local version'}
      onClick={() => {
        alert('show popup with all info with proper route')
      }}
    />
  )
}
