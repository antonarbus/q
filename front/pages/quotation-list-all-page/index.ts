import { lazy } from 'react'

export const QuotationListAllPageLazy = lazy(async () => {
  const module = await import('./QuotationListAllPage')
  return { default: module.QuotationListAllPage }
})
