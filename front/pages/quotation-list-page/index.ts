import { lazy } from 'react'

export const QuotationListPageLazy = lazy(async () => {
  const module = await import('./QuotationListPage')
  return { default: module.QuotationListPage }
})
