import { Blocks } from '@widgets/blocks'
import { getState } from '@shared/lib/redux'
import { Layout } from './Layout'

export const QuotationPreviewField = (): React.ReactNode => {
  const { blocks } = getState().quotation

  return (
    <Layout>
      <Blocks blocks={blocks} />
    </Layout>
  )
}
