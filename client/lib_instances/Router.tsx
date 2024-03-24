import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { QuotationTemplate, QuotationServer } from '@pages/quotation'
import { Quotations } from '@pages/quotations'
import { PersistentAuth, RequireAuth, Unauthorized } from '@widgets/auth'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { Login } from '@features/auth/log_in'
import { Register } from '@features/auth/register'
import { Reset } from '@features/auth/reset'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { TopMsg } from '@shared/ui/top_msg'

const authRoutes: RouteObject[] = [
  {
    path: route.login,
    element: <Login />,
  },
  {
    path: route.register,
    element: <Register />,
  },
  {
    path: route.reset,
    element: <Reset />,
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
        path: route.root,
        element: <QuotationTemplate />,
        children: authRoutes,
      },
      {
        path: ':id?',
        element: <QuotationServer />,
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
