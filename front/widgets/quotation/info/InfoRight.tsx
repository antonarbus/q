import { OpenInfoQuotationIcon } from '@front/features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@front/features/open-close/open-share-quotation-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'

export const InfoRight = (): React.ReactNode => {
  const isFullAppView = useIsFullAppView()

  return (
    <Layout>
      {isFullAppView === false && <OpenInfoQuotationIcon />}
      {isFullAppView === false && <OpenShareQuotationIcon />}
      <QuotationId />
    </Layout>
  )
}
