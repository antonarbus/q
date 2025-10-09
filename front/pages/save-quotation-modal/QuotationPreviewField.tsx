import { getState } from '@shared/lib/redux'
import { BlockMany } from '@widgets/block'
import type { ReactNode } from 'react'
import { Layout } from './Layout'

export const QuotationPreviewField = (): ReactNode => {
  const { blocks } = getState().quotation

  return (
    <Layout>
      <BlockMany blocks={blocks} />
    </Layout>
  )
}
