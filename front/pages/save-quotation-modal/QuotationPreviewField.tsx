import { BlockMany } from '@widgets/block'
import { getState } from '@shared/lib/redux'
import { Layout } from './Layout'

export const QuotationPreviewField = (): React.ReactNode => {
  const { blocks } = getState().quotation

  return (
    <Layout>
      <BlockMany blocks={blocks} />
    </Layout>
  )
}
