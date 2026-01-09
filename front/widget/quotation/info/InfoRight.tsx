import { OpenInfoQuotationIcon } from '@feature/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@feature/open-close/open-share-quotation-modal'
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
