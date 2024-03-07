import { createBrowserRouter } from 'react-router-dom'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { Quotation } from '@pages/quotation'
import { Quotations } from '@pages/quotations'
import { Copy } from '@widgets/copy'
import { Login, PersistentAuth, Register, RequireAuth, Reset, Unauthorized } from '@widgets/credentials'
import { Nav } from '@widgets/nav'
import { useFetchQuotation } from '@entities/quotation'
import { Spinner } from '@entities/spinner'
import { route } from '@shared/consts/route'
import { Main } from '@shared/layouts'
import { TopMsg } from '@shared/ui/top_msg'

export const router = createBrowserRouter([
  {
    path: route.root,
    element: (
      <>
        <TopMsg />
        <Spinner />
        <Nav />
        <Copy />
        <Main />
      </>
    ),
    children: [
      {
        path: '/:id?',
        element: <Quotation />,
      },
      {
        path: route.register,
        element: <Register />,
      },
      {
        path: route.login,
        element: <Login />,
      },
      {
        path: route.reset,
        element: <Reset />,
      },
      {
        path: route.quotations,
        element: <Quotations />,
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
