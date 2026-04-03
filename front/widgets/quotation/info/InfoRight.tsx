import { OpenInfoQuotationIcon } from '@front/features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@front/features/open-close/open-share-quotation-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'
import { useIsStranger } from '@front/entities/quotation/useIsStranger'

export const InfoRight = (): React.ReactNode => {
  const isStranger = useIsStranger()

  return (
    <Layout>
      {isStranger === false && <OpenInfoQuotationIcon />}
      {isStranger === false && <OpenShareQuotationIcon />}
      <QuotationId />
    </Layout>
  )
}
