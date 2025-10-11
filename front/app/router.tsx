import { userRole } from '@entities/user/const/userRole'
import { RequireRoles } from '@features/auth/check-required-roles'
import { AccessToken } from '@features/auth/get-access-token'
import { Logout } from '@features/auth/log-out'
import { LoadQuotation } from '@features/quotation/load-quotation'
import { ActivationModal } from '@pages/auth-activation-modal'
import { LoginModal } from '@pages/auth-login-modal'
import { RegisterModal } from '@pages/auth-register-modal'
import { RequestPasswordResetModal } from '@pages/auth-request-password-reset-modal'
import { ResetPasswordModal } from '@pages/auth-reset-password-modal'
import { BookmarkModal } from '@pages/bookmark-modal'
import { ErrorPage } from '@pages/error-page'
import { InfoModal } from '@pages/info-modal'
import { SaveQuotationModal } from '@pages/save-quotation-modal'
import { SettingsModal } from '@pages/settings-modal'
import { ShareQuotationModal } from '@pages/share-quotation-modal'
import { TestPage } from '@pages/test-page'
import { LoadingDotsOverlay } from '@shared/component/loading-dots-overlay'
import { Main } from '@shared/layout/Main'
import { route } from '@shared/lib/react-router-dom/route'
import { instantiateRouter } from '@shared/lib/react-router-dom/router'
import { Copy } from '@widgets/copy'
import { Footer } from '@widgets/footer'
import { Nav } from '@widgets/nav'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { Toaster } from 'sonner'
import { OnInitLoad } from './OnInitLoad'

const QuotationPageLazy = lazy(async () => {
  const module = await import('@pages/quotation-page')

  return module
})

const QuotationListPageLazy = lazy(async () => {
  const module = await import('@pages/quotation-list-page')

  return module
})

const BookmarkListPageLazy = lazy(async () => {
  const module = await import('@pages/bookmark-list-page')

  return module
})

const QuotationListAllPageLazy = lazy(async () => {
  const module = await import('@pages/quotation-list-all-page')

  return module
})

const BookmarkListAllPageLazy = lazy(async () => {
  const module = await import('@pages/bookmark-list-all-page')

  return module
})

const UserListPageLazy = lazy(async () => {
  const module = await import('@pages/user-list-page')

  return module
})

const VisitorListPageLazy = lazy(async () => {
  const module = await import('@pages/visitor-list-page')

  return module
})

const FileListAllPageLazy = lazy(async () => {
  const module = await import('@pages/file-list-all-page')

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
        <Toaster expand position='bottom-center' richColors />
        <LoadingDotsOverlay shouldShowLoader={false} text={null} />
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
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <LoadQuotation />
            <QuotationPageLazy />
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
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <QuotationListPageLazy />
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
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <BookmarkListPageLazy />
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
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <UserListPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.visitorList,
        element: (
          <Suspense
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <VisitorListPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.quotationListAll,
        element: (
          <Suspense
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <QuotationListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.bookmarkListAll,
        element: (
          <Suspense
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <BookmarkListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.fileListAll,
        element: (
          <Suspense
            fallback={<LoadingDotsOverlay shouldShowLoader text='Loading...' />}
          >
            <RequireRoles requiredRoles={[userRole.superAdmin]}>
              <FileListAllPageLazy />
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
