import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { Activation } from '@pages/auth/Activation'
import { PersistentAuth } from '@pages/auth/PersistentAuth'
import { RequireAuth } from '@pages/auth/RequireAuth'
import { Unauthorized } from '@pages/auth/Unauthorized'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { Quotation } from '@pages/quotation'
import { Quotations } from '@pages/quotations'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { LogIn } from '@features/auth/log_in'
import { LogOut } from '@features/auth/log_out'
import { Register } from '@features/auth/register'
import { RequestPasswordReset } from '@features/auth/request_password_reset'
import { ResetPassword } from '@features/auth/reset_password'
import { SaveQuotation } from '@features/quotation/save_quotation'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'

const authRoutes: RouteObject[] = [
  {
    path: route.login,
    element: <LogIn />,
  },
  {
    path: route.logout,
    element: <LogOut />,
  },
  {
    path: route.register,
    element: <Register />,
  },
  {
    path: route.requestPasswordReset,
    element: <RequestPasswordReset />,
  },
  {
    path: `${route.activate}/:activationKey`,
    caseSensitive: true,
    element: <Activation />,
  },
  {
    path: `${route.resetPassword}/:email/:resetPasswordKey`,
    caseSensitive: true,
    element: <ResetPassword />,
  },
  {
    path: `${route.saveQuotation}`,
    element: <SaveQuotation />,
  },
]

export const router = createBrowserRouter([
  {

    element: (
      <>
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
        element: <Quotation />,
        caseSensitive: true,
        children: authRoutes,
      },
      {
        path: route.quotations,
        element: <Quotations />,
        children: authRoutes,
      },
      {
        // just an example of protected routes with specific roles, may be helpful for administration
        element: <PersistentAuth />,
        children: [
          {
            element: <RequireAuth allowedRoles={['user']} />,
            children: [
              {
                path: route.profile,
                element: <Profile />,
              },
              {
                path: route.settings,
                element: <div>Settings</div>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'unauthorized',
    element: <Unauthorized />,
  },
  {
    path: 'chart',
    element: <BarChart />,
  },
])
