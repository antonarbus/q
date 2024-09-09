import React, { Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { BookmarkModal } from '@pages/bookmark_modal'
import { ErrorPage } from '@pages/error_page'
import { InfoModal } from '@pages/info_modal'
import { QuotationModal } from '@pages/quotation_modal'
import { SettingsModal } from '@pages/settings_modal'
import { CopyModal } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
import { Logout } from '@features/auth/log_out'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts/Main'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { LoginModal } from '@pages/auth_login_modal'
import { RegisterModal } from '@pages/auth_register_modal'
import { RequestPasswordResetModal } from '@pages/auth_request_password_reset_modal'
import { ActivationModal } from '@pages/auth_activation_modal'
import { ResetPasswordModal } from '@pages/auth_reset_password_modal'
import { UnauthorizedPage } from '@pages/auth_unauthorized_page'
import { Toast } from '@shared/toast'

const Quotation = React.lazy(async () => {
  return import('@pages/quotation_page')
})

const QuotationsTable = React.lazy(async () => {
  return import('@pages/quotations_page')
})

const BookmarksTable = React.lazy(async () => {
  return import('@pages/bookmarks_page')
})

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
        <Toast />
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
          <Suspense
            fallback={
              <LoadingDotsOverlay
                title='Loading...'
                isShowing
              />
            }
          >
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
          <Suspense
            fallback={
              <LoadingDotsOverlay
                title='Loading...'
                isShowing
              />
            }
          >
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
          <Suspense
            fallback={
              <LoadingDotsOverlay
                title='Loading...'
                isShowing
              />
            }
          >
            <BookmarksTable />
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
