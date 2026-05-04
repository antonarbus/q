import type { FC } from 'react'
import { OpenInfoQuotationIcon } from '@front/features/open-close/open-info-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'

export const InfoRight: FC = () => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
