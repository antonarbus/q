import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { ActivationModal } from '@pages/auth/ActivationModal'
import { LoginModal } from '@pages/auth/LoginModal'
import { RegisterModal } from '@pages/auth/RegisterModal'
import { RequestPasswordResetModal } from '@pages/auth/RequestPasswordResetModal'
import { ResetPasswordModal } from '@pages/auth/ResetPasswordModal'
import { UnauthorizedPage } from '@pages/auth/UnauthorizedPage'
import { BookmarkSaveModal } from '@pages/bookmark/bookmark_save_modal'
import { BookmarkEditModal } from '@pages/bookmark/bookmark_edit_modal'
import { ErrorPage } from '@pages/error'
import { InfoModal } from '@pages/info/info_modal'
import { InfoQuotationModal } from '@pages/quotation/info_quotation_modal'
import { QuotationSaveModal } from '@pages/quotation/quotation_save_modal'
import { SettingsModal } from '@pages/settings'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
import { Logout } from '@features/auth/log_out'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'
import { QuotationEditModal } from '@pages/quotation/quotation_edit_modal'

const Quotation = React.lazy(async () => {
  return import('@pages/quotation/quotation_page')
})

const QuotationsTable = React.lazy(
  async () => import('@pages/quotation/quotations_page'),
)

const ItemsTable = React.lazy(
  async () => import('@pages/bookmark/bookmarks_page'),
)

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
  {
    path: route.settings,
    element: <SettingsModal />,
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
            element: <QuotationSaveModal />,
          },
          {
            path: `${route.bookmark}/:id`,
            element: <BookmarkSaveModal />,
          },
          {
            path: `${route.infoQuotation}/:id`,
            element: <InfoQuotationModal />,
          },
          {
            path: `${route.infoItem}/:id`,
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
            element: <QuotationEditModal />,
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
            element: <BookmarkEditModal />,
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
