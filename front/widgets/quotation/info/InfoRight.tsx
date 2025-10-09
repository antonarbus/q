import { OpenInfoQuotationIcon } from '@features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@features/open-close/open-share-quotation-modal'
import type { ReactNode } from 'react'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'

export const InfoRight = (): ReactNode => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <OpenShareQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
