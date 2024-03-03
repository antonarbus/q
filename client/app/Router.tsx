import { createBrowserRouter } from 'react-router-dom'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { Login, PersistentAuth, Register, RequireAuth, Reset, Unauthorized } from '@widgets/credentials'
import { Nav } from '@widgets/nav'
import { Spinner } from '@entities/spinner'
import { TopMsg } from '@shared/ui/top_msg'
import { Main } from './Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <TopMsg />
        <Spinner />
        <Nav />
        <Main />
      </>
    ),
    children: [
      {
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
