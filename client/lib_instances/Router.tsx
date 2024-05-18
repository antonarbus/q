import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { ActivationModal } from '@pages/auth/ActivationModal'
import { LoginModal } from '@pages/auth/LoginModal'
import { RegisterModal } from '@pages/auth/RegisterModal'
import { RequestPasswordResetModal } from '@pages/auth/RequestPasswordResetModal'
import { ResetPasswordModal } from '@pages/auth/ResetPasswordModal'
import { UnauthorizedPage } from '@pages/auth/UnauthorizedPage'
import { EditBookmarkModal } from '@pages/edit_bookmark_modal'
import { EditQuotationModal } from '@pages/edit_quotation_modal/EditQuotationModal'
import { ErrorPage } from '@pages/error_page'
import { InfoModal } from '@pages/info_modal'
import { SaveBookmarkModal } from '@pages/save_bookmark_modal'
import { SaveQuotationModal } from '@pages/save_quotation_modal'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
import { Logout } from '@features/auth/log_out'
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
const ItemsTable = React.lazy(async () => await import('@pages/bookmarks_page'))

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
            path: `${route.bookmark}/:id`,
            element: <SaveBookmarkModal />,
          },
          {
            path: `${route.info}/:id`,
            element: <InfoModal />,
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
            path: `${route.editQuotation}/:id`,
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
            path: `${route.editBookmark}/:id`,
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
