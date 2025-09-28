import { BlockMany } from '@widgets/block'
import { getState } from '@shared/lib/redux'
import { Layout } from './Layout'
import type { ReactNode } from 'react'

export const QuotationPreviewField = (): ReactNode => {
  const { blocks } = getState().quotation

  return (
    <Layout>
      <BlockMany blocks={blocks} />
    </Layout>
  )
}
