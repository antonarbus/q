import { lazy, Suspense } from 'react'
import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { BookmarkModal } from '@pages/bookmark_modal'
import { ErrorPage } from '@pages/error_page'
import { InfoModal } from '@pages/info_modal'
import { SaveQuotationModal } from '@pages/save_quotation_modal'
import { SettingsModal } from '@pages/settings_modal'
import { Copy } from '@widgets/copy'
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
import { Footer } from '@widgets/footer'
import { RequireRoles } from '@features/auth/check_required_roles'
import { instantiateRouter } from '@shared/lib/router'
import { OnInitLoad } from './OnInitLoad'
import { userRole } from '@entities/user'
import { Toaster } from 'sonner'
import { ShareQuotationModal } from '@pages/share_quotation_modal'
import { LoadQuotation } from '@features/quotation/load_quotation'
import { TestPage } from '@pages/test_page'

const Quotation = lazy(async () => {
  const module = await import('@pages/quotation_page')

  return module
})

const QuotationsPageLazy = lazy(async () => {
  const module = await import('@pages/quotations_page')

  return module
})

const BookmarksPageLazy = lazy(async () => {
  const module = await import('@pages/bookmarks_page')

  return module
})

const AdminPageLazy = lazy(async () => {
  const module = await import('@pages/admin_page')

  return module
})

const VisitorsPageLazy = lazy(async () => {
  const module = await import('@pages/visitors_page')

  return module
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

const router = createBrowserRouter([
  {
    element: (
      <>
        <OnInitLoad />
        <AccessToken />
        <Toaster
          expand
          position='bottom-center'
          richColors
        />
        <LoadingDotsOverlay
          shouldShowLoader={false}
          text={null}
        />
        <Nav />
        <Copy />
        <Main />
        <Footer />
      </>
    ),
    children: [
      {
        path: ':quotationId?',
        element: (
          <Suspense
            fallback={
              <LoadingDotsOverlay
                shouldShowLoader
                text='Loading...'
              />
            }
          >
            <LoadQuotation />
            <Quotation />
          </Suspense>
        ),
        caseSensitive: true,
        children: [
          ...authRoutes,
          {
            path: route.save,
            element: <SaveQuotationModal />,
          },
          {
            path: route.share,
            element: <ShareQuotationModal />,
          },
          {
            path: `${route.bookmark}/:bookmarkId`,
            element: <BookmarkModal />,
          },
          {
            path: route.info,
            element: <InfoModal />,
          },
          {
            path: `${route.info}/:bookmarkId`,
            element: <InfoModal />,
          },
        ],
      },
      {
        path: route.quotationList,
        element: (
          <Suspense
            fallback={
              <LoadingDotsOverlay
                shouldShowLoader
                text='Loading...'
              />
            }
          >
            <QuotationsPageLazy />
          </Suspense>
        ),
        children: [
          ...authRoutes,
          {
            path: `:quotationId`,
            element: <SaveQuotationModal />,
          },
          {
            path: `${route.share}/:quotationId`,
            element: <ShareQuotationModal />,
          },
        ],
      },
      {
        path: route.bookmarkList,
        element: (
          <Suspense
            fallback={
              <LoadingDotsOverlay
                shouldShowLoader
                text='Loading...'
              />
            }
          >
            <BookmarksPageLazy />
          </Suspense>
        ),
        children: [
          ...authRoutes,
          {
            path: `:bookmarkId`,
            element: <BookmarkModal />,
          },
        ],
      },
      {
        path: route.userList,
        element: (
          <Suspense
            fallback={
              <LoadingDotsOverlay
                shouldShowLoader
                text='Loading...'
              />
            }
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <AdminPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.visitorList,
        element: (
          <Suspense
            fallback={
              <LoadingDotsOverlay
                shouldShowLoader
                text='Loading...'
              />
            }
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <VisitorsPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: 'test',
        element: (
          <RequireRoles requiredRoles={[userRole.superAdmin]}>
            <TestPage />
          </RequireRoles>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
])

export type Router = typeof router

instantiateRouter(router)
