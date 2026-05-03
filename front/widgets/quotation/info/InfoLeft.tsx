import type { FC } from 'react'
import { Layout } from './Layout'
import { StatusBadge } from './StatusBadge'

export const InfoLeft: FC = () => {
  return (
    <Layout align='start'>
      <StatusBadge />
    </Layout>
  )
}
