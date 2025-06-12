import { OpenInfoQuotationIcon } from '@features/open_close/open_info_modal'
import { OpenShareQuotationIcon } from '@features/open_close/open_share_quotation_modal'
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
