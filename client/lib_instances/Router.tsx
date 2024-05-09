import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { ActivationModal } from '@pages/auth/Activation'
import { Unauthorized } from '@pages/auth/Unauthorized'
// import { BarChart } from '@pages/chart/Chart'
import { EditItemModal } from '@pages/edit_item'
import { EditQuotationModal } from '@pages/edit_quotation/EditQuotationModal'
import { ErrorPage } from '@pages/error_page'
// import { ItemsTable } from '@pages/items_table'
// import { Quotation } from '@pages/quotation'
// import { QuotationsTable } from '@pages/quotations_table'
import { SaveItemModal } from '@pages/save_item'
import { SaveQuotationModal } from '@pages/save_quotation'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
import { LoginModal } from '@features/auth/log_in'
import { LogoutModal } from '@features/auth/log_out'
import { RegisterModal } from '@features/auth/register'
import { RequestPasswordResetModal } from '@features/auth/request_password_reset'
import { ResetPasswordModal } from '@features/auth/reset_password'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'
// import { asyncDelay } from '@shared/utils/delay'

const Quotation = React.lazy(async () => {
  // await asyncDelay(10000)
  return await import('@pages/quotation')
})
const QuotationsTable = React.lazy(async () => await import('@pages/quotations_table'))
const ItemsTable = React.lazy(async () => await import('@pages/items_table'))

const authRoutes: RouteObject[] = [
  {
    path: route.login,
    element: <LoginModal />,
  },
  {
    path: route.logout,
    element: <LogoutModal />,
  },
  {
    path: route.register,
    element: <RegisterModal />,
  },
  {
    path: route.requestPasswordReset,
    element: <RequestPasswordResetModal />,
  },
  {
    path: `${route.activate}/:activationKey`,
    caseSensitive: true,
    element: <ActivationModal />,
  },
  {
    path: `${route.resetPassword}/:email/:resetPasswordKey`,
    caseSensitive: true,
    element: <ResetPasswordModal />,
  },
]

export const router = createBrowserRouter([
  {
    element: (
      <>
        <AccessToken />
        <TopMsg />
        <LoadingDotsOverlay />
        <Nav />
        <Copy />
        <Main />
      </>
    ),
    children: [
      {
        path: ':id?',
        element: (
          <Suspense>
            <Quotation />
          </Suspense>
        ),
        caseSensitive: true,
        children: [
          ...authRoutes,
          {
            path: route.saveQuotation,
            element: <SaveQuotationModal />,
          },
          {
            path: route.saveItem,
            element: <SaveItemModal />,
          },
        ],
      },
      {
        path: route.quotations,
        element: (
          <Suspense>
            <QuotationsTable />
          </Suspense>
        ),
        children: [
          ...authRoutes,
          {
            path: route.editQuotation,
            element: <EditQuotationModal />,
          },
        ],
      },
      {
        path: route.items,
        element: (
          <Suspense>
            <ItemsTable />
          </Suspense>
        ),
        children: [
          ...authRoutes,
          {
            path: route.editItem,
            element: <EditItemModal />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: 'unauthorized',
    element: <Unauthorized />,
  },
])
