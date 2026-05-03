import { OpenInfoQuotationIcon } from '@front/features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@front/features/open-close/open-share-quotation-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'
import type { FC } from 'react'

export const InfoRight: FC = () => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <OpenShareQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
