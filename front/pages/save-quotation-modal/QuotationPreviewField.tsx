import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { BlockMany } from '@front/widgets/block'
import { Layout } from './Layout'

export const QuotationPreviewField = (): React.ReactNode => {
  return (
    <Layout>
      <BlockMany blocks={reduxHolder.getState().quotation.blocks} />
    </Layout>
  )
}
