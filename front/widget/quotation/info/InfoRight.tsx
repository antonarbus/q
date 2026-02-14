import { OpenInfoQuotationIcon } from '@feature/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@feature/open-close/open-share-quotation-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'

export const InfoRight = (): React.ReactNode => {
  return (
    <Layout>
      <OpenInfoQuotationIcon />
      <OpenShareQuotationIcon />
      <QuotationId />
    </Layout>
  )
}
