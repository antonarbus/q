import { useSelectorTyped } from '@lib_instances/store'
import { type ReactNode } from 'react'
import { QuotationInfoLayout } from './QuotationInfoLayout'

export const QuotationInfo = (): ReactNode => {
  const id = useSelectorTyped(state => state.quotation.id)

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
