import { RequireRoles } from '@feature/auth/check-page-required-roles/RequireRoles'
import { AccessToken } from '@feature/auth/try-to-log-in-without-prompt/AccessToken'
import { Logout } from '@feature/auth/log-out/Logout'
import { LoadQuotation } from '@feature/quotation/load-quotation'
import { ActivationModal } from '@page/auth-activation-modal/ActivationModal'
import { LoginModal } from '@page/auth-login-modal/LoginModal'
import { RegisterModal } from '@page/auth-register-modal/RegisterModal'
import { RequestPasswordResetModal } from '@page/auth-request-password-reset-modal/RequestPasswordResetModal'
import { ResetPasswordModal } from '@page/auth-reset-password-modal/ResetPasswordModal'
import { BookmarkModal } from '@page/bookmark-modal/BookmarkModal'
import { ErrorPage } from '@page/error-page/ErrorPage'
import { InfoModal } from '@page/info-modal/InfoModal'
import { SaveQuotationModal } from '@page/save-quotation-modal/SaveQuotationModal'
import { SettingsModal } from '@page/settings-modal/SettingsModal'
import { ShareQuotationModal } from '@page/share-quotation-modal/ShareQuotationModal'
import { TestPage } from '@page/test-page/TestPage'
import { LoadingDotsOverlay } from '@shared/component/loading-dots-overlay'
import { Main } from '@shared/layout/Main'
import { route } from '@shared/lib/react-router-dom/route'
import { instantiateRouter } from '@shared/lib/react-router-dom/router'
import { Copy } from '@widget/copy'
import { BookmarkCopyPreviewCapturer } from '@entity/copy/BookmarkCopyPreviewCapturer'
import { Footer } from '@widget/footer'
import { Nav } from '@widget/nav'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { Toaster } from 'sonner'
import { OnInitLoad } from './OnInitLoad'
import { ConfirmationDialog } from '@shared/component/ConfirmationDialog'

const QuotationPageLazy = lazy(async () => {
  const module = await import('@page/quotation-page')

  return module
})

const QuotationListPageLazy = lazy(async () => {
  const module = await import('@page/quotation-list-page')

  return module
})

const BookmarkListPageLazy = lazy(async () => {
  const module = await import('@page/bookmark-list-page')

  return module
})

const QuotationListAllPageLazy = lazy(async () => {
  const module = await import('@page/quotation-list-all-page')

  return module
})

const BookmarkListAllPageLazy = lazy(async () => {
  const module = await import('@page/bookmark-list-all-page')

  return module
})

const UserListPageLazy = lazy(async () => {
  const module = await import('@page/user-list-page')

  return module
})

const VisitorListPageLazy = lazy(async () => {
  const module = await import('@page/visitor-list-page')

  return module
})

const FileListAllPageLazy = lazy(async () => {
  const module = await import('@page/file-list-all-page')

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
        <BookmarkCopyPreviewCapturer />
        <ConfirmationDialog />
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
            <RequireRoles requiredRoles={['super-admin']}>
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
            <RequireRoles requiredRoles={['super-admin']}>
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
            <RequireRoles requiredRoles={['super-admin']}>
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
            <RequireRoles requiredRoles={['super-admin']}>
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
            <RequireRoles requiredRoles={['super-admin']}>
              <FileListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: 'test',
        element: (
          <RequireRoles requiredRoles={['super-admin']}>
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
