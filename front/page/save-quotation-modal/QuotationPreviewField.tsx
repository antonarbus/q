import { getState } from '@shared/lib/redux'
import { BlockMany } from '@widget/block'
import type { ReactNode } from 'react'
import { Layout } from './Layout'

export const QuotationPreviewField = (): ReactNode => {
  return (
    <Layout>
      <BlockMany blocks={getState().quotation.blocks} />
    </Layout>
  )
}
