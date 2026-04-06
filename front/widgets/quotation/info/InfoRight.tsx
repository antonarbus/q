import { OpenInfoQuotationIcon } from '@front/features/open-close/open-info-modal'
import { OpenShareQuotationIcon } from '@front/features/open-close/open-share-quotation-modal'
import { Layout } from './Layout'
import { QuotationId } from './QuotationId'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'

export const InfoRight = (): React.ReactNode => {
  const isEditorView = useIsEditorView()

  return (
    <Layout>
      {isEditorView && <OpenInfoQuotationIcon />}
      {isEditorView && <OpenShareQuotationIcon />}
      <QuotationId />
    </Layout>
  )
}
