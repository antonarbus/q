import { getState } from '@shared/lib/redux'
import { BlockMany } from '@widget/block'
import { Layout } from './Layout'

export const QuotationPreviewField = (): React.ReactNode => {
  return (
    <Layout>
      <BlockMany blocks={getState().quotation.blocks} />
    </Layout>
  )
}
