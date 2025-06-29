import { OpenInfoQuotationIcon } from '@features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@features/open-close/open-share-quotation-modal'
import { QuotationId } from './QuotationId'
import { Layout } from './Layout'

export const InfoRight = (): React.ReactNode => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <OpenShareQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
