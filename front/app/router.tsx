import { RequireRoles } from '@front/features/auth/check-page-required-roles-before-page-load/RequireRoles'
import { AccessToken } from '@front/features/auth/try-to-log-in-without-prompt/AccessToken'
import { Logout } from '@front/features/auth/log-out/Logout'
import { LoadQuotation } from '@front/features/quotation/load-quotation'
import { ActivationModal } from '@front/pages/auth-activation-modal/ActivationModal'
import { LoginModal } from '@front/pages/auth-login-modal/LoginModal'
import { RegisterModal } from '@front/pages/auth-register-modal/RegisterModal'
import { RequestPasswordResetModal } from '@front/pages/auth-request-password-reset-modal/RequestPasswordResetModal'
import { ResetPasswordModal } from '@front/pages/auth-reset-password-modal/ResetPasswordModal'
import { BookmarkModal } from '@front/pages/bookmark-modal/BookmarkModal'
import { ErrorPage } from '@front/pages/error-page/ErrorPage'
import { InfoModal } from '@front/pages/info-modal/InfoModal'
import { SaveQuotationModal } from '@front/pages/save-quotation-modal/SaveQuotationModal'
import { SettingsModal } from '@front/pages/settings-modal/SettingsModal'
import { StripeConnectModal } from '@front/pages/stripe-connect-modal/StripeConnectModal'
import { SubscriptionPage } from '@front/pages/subscription-page/SubscriptionPage'
import { ShareQuotationModal } from '@front/pages/share-quotation-modal/ShareQuotationModal'
import { WelcomeGuideModal } from '@front/pages/welcome-guide-modal/WelcomeGuideModal'
import { TestPage } from '@front/pages/test-page/TestPage'
import { LoadingDotsOverlay } from '@front/shared/component/loading-dots-overlay'
import { Main } from '@front/shared/layout/Main'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { Suggestion } from '@front/widgets/suggestion'
import { Clipboard, ClipboardPreviewCapturer } from '@front/widgets/clipboard'
import { Footer } from '@front/widgets/footer'
import { Nav } from '@front/widgets/nav'
import { BookmarkListAllPageLazy } from '@front/pages/bookmark-list-all-page'
import { BookmarkListPageLazy } from '@front/pages/bookmark-list-page'
import { FileListAllPageLazy } from '@front/pages/file-list-all-page'
import { QuotationListAllPageLazy } from '@front/pages/quotation-list-all-page'
import { QuotationListPageLazy } from '@front/pages/quotation-list-page'
import { QuotationPageLazy } from '@front/pages/quotation-page'
import { UserListPageLazy } from '@front/pages/user-list-page'
import { VisitorListPageLazy } from '@front/pages/visitor-list-page'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { Toaster } from 'sonner'
import { OnInitLoad } from './OnInitLoad'
import { ConfirmationDialog } from '@front/shared/component/confirmation-dialog/ConfirmationDialog'

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
  {
    path: route.stripeConnect,
    element: <StripeConnectModal />,
  },
  {
    path: route.welcomeGuide,
    element: <WelcomeGuideModal />,
  },
]

const router = createBrowserRouter([
  {
    element: (
      <>
        <OnInitLoad />
        <AccessToken />
        <Toaster expand={true} position='bottom-center' richColors={true} />
        <LoadingDotsOverlay shouldShowLoader={false} text={null} />
        <Nav />
        <Suggestion />
        <Clipboard />
        <ClipboardPreviewCapturer />
        <ConfirmationDialog />
        <Main />
        <Footer />
      </>
    ),
    children: [
      {
        path: ':quotationId?',
        element: (
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
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
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
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
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
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
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
            <RequireRoles requiredRoles={['super-admin']}>
              <UserListPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.visitorList,
        element: (
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
            <RequireRoles requiredRoles={['super-admin']}>
              <VisitorListPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.quotationListAll,
        element: (
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
            <RequireRoles requiredRoles={['super-admin']}>
              <QuotationListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.bookmarkListAll,
        element: (
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
            <RequireRoles requiredRoles={['super-admin']}>
              <BookmarkListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.fileListAll,
        element: (
          <Suspense fallback={<LoadingDotsOverlay shouldShowLoader={true} text='Loading...' />}>
            <RequireRoles requiredRoles={['super-admin']}>
              <FileListAllPageLazy />
            </RequireRoles>
          </Suspense>
        ),
      },
      {
        path: route.subscription,
        element: <SubscriptionPage />,
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

export const initRouter = (): void => {
  routerHolder.router = router
}
