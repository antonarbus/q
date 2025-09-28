import { OpenInfoQuotationIcon } from '@features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@features/open-close/open-share-quotation-modal'
import { QuotationId } from './QuotationId'
import { Layout } from './Layout'
import type { ReactNode } from 'react'

export const InfoRight = (): ReactNode => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <OpenShareQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
