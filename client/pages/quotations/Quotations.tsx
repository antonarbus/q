import { Outlet } from 'react-router-dom'
import { QuotationsLayout } from './QuotationsLayout'
import { QuotationsTable } from './QuotationsTable'

export const Quotations = (): JSX.Element => {
  return (
    <QuotationsLayout>
      <QuotationsTable />
      <Outlet />
    </QuotationsLayout>
  )
}
