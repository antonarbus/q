import { createBrowserRouter } from 'react-router-dom'
import { Main } from '@app/Main'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { Copy } from '@widgets/copy'
import { Login, PersistentAuth, Register, RequireAuth, Reset, Unauthorized } from '@widgets/credentials'
import { Nav } from '@widgets/nav'
import { FetchQuotation } from '@entities/quotation'
import { Spinner } from '@entities/spinner'
import { TopMsg } from '@shared/ui/top_msg'

export const router = createBrowserRouter([
  {
    path: '/',
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
        path: ':id',
        element: <FetchQuotation />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reset',
        element: <Reset />,
      },
      {
        // * just an example of routes protection with specific roles, may be helpful for administration
        element: <PersistentAuth />,
        children: [
          {
            element: <RequireAuth allowedRoles={['user']} />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'settings',
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
