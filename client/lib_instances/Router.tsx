import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { ActivationModal } from '@pages/auth/ActivationModal'
import { UnauthorizedPage } from '@pages/auth/UnauthorizedPage'
// import { BarChart } from '@pages/chart/Chart'
import { EditBookmarkModal } from '@pages/edit_bookmark_modal'
import { EditQuotationModal } from '@pages/edit_quotation_modal/EditQuotationModal'
import { ErrorPage } from '@pages/error_page'
// import { ItemsTable } from '@pages/items_table'
// import { Quotation } from '@pages/quotation'
// import { QuotationsTable } from '@pages/quotations_table'
import { ItemInfoModal } from '@pages/item_info_modal'
import { LoginModal } from '@pages/login_modal'
import { QuotationInfoModal } from '@pages/quotation_info_modal'
import { RegisterModal } from '@pages/register_modal'
import { RequestPasswordResetModal } from '@pages/request_password_reset_modal'
import { ResetPasswordModal } from '@pages/reset_password_modal'
import { SaveBookmarkModal } from '@pages/save_bookmark_modal'
import { SaveQuotationModal } from '@pages/save_quotation_modal'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/get_access_token'
import { Logout } from '@features/log_out'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'
// import { asyncDelay } from '@shared/utils/delay'

const Quotation = React.lazy(async () => {
  // await asyncDelay(10000)
  return await import('@pages/quotation_page')
})
const QuotationsTable = React.lazy(async () => await import('@pages/quotations_page'))
const ItemsTable = React.lazy(async () => await import('@pages/items_page'))

const authRoutes: RouteObject[] = [
  {
    path: route.login,
    element: <LoginModal />,
  },
  {
    path: route.logout,
    element: <Logout />,
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
            path: route.bookmark,
            element: <SaveBookmarkModal />,
          },
          {
            path: route.quotationInfo,
            element: <QuotationInfoModal />,
          },
          {
            path: route.itemInfo,
            element: <ItemInfoModal />,
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
        path: route.bookmarks,
        element: (
          <Suspense>
            <ItemsTable />
          </Suspense>
        ),
        children: [
          ...authRoutes,
          {
            path: route.editBookmark,
            element: <EditBookmarkModal />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: 'unauthorized',
    element: <UnauthorizedPage />,
  },
])
