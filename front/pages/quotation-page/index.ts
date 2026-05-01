import { lazy } from 'react'

export const QuotationPageLazy = lazy(async () => {
  const module = await import('./QuotationPage')
  return { default: module.QuotationPage }
})
