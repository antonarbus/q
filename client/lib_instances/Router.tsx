import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { Activation } from '@pages/auth/Activation'
import { Unauthorized } from '@pages/auth/Unauthorized'
import { BarChart } from '@pages/chart/Chart'
import { EditItem } from '@pages/edit_item'
import { ItemsTable } from '@pages/items_table'
import { Quotation } from '@pages/quotation'
import { QuotationsTable } from '@pages/quotations_table'
import { Copy } from '@widgets/copy'
import { Nav } from '@widgets/nav'
import { AccessToken } from '@features/auth/get_access_token'
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
]

export const router = createBrowserRouter([
  {
    element: (
      <>
        <AccessToken />
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
        children: [
          ...authRoutes,
          {
            path: route.save,
            element: <SaveQuotation />,
          },
          {
            path: route.editItem,
            element: <EditItem />,
          },
        ],
      },
      {
        path: route.quotations,
        element: <QuotationsTable />,
        children: authRoutes,
      },
      {
        path: route.items,
        element: <ItemsTable />,
        children: [
          ...authRoutes,
          {
            path: route.editItem,
            element: <EditItem />,
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
