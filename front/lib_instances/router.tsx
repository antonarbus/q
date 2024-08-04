import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { ActivationModal } from '@pages/auth/ActivationModal'
import { LoginModal } from '@pages/auth/LoginModal'
import { RegisterModal } from '@pages/auth/RegisterModal'
import { RequestPasswordResetModal } from '@pages/auth/RequestPasswordResetModal'
import { ResetPasswordModal } from '@pages/auth/ResetPasswordModal'
import { UnauthorizedPage } from '@pages/auth/UnauthorizedPage'
import { BookmarkModal } from '@pages/bookmark/bookmark_modal'
import { ErrorPage } from '@pages/error'
import { InfoModal } from '@pages/info/info_modal'
import { QuotationModal } from '@pages/quotation/quotation_modal'
import { SettingsModal } from '@pages/settings'
import { CopyModal } from '@widgets/copy_modal'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
import { Logout } from '@features/auth/log_out'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'

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
        <CopyModal />
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
            path: route.save,
            element: <QuotationModal />,
          },
          {
            path: `${route.bookmark}/:id`,
            element: <BookmarkModal />,
          },
          {
            path: route.info,
            element: <InfoModal />,
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
            path: `:id`,
            element: <QuotationModal />,
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
            path: `:id`,
            element: <BookmarkModal />,
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
