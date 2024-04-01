import { type ReactNode } from 'react'
import { quotationSignal } from '@entities/quotation'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): ReactNode => {
  const id = quotationSignal.value?.id

  if (id === '' || id === undefined) return null

  return (
    <QuotationInfoLayout
      quotationId={id}
      onClick={() => {
        alert('show popup with all info with proper route')
      }}
    />
  )
}
