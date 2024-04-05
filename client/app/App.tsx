import '@shared/utils/nonPassiveEventErrorFix'
import { reactQuery } from '@lib_instances/reactQuery'
import { router } from '@lib_instances/Router'
import { store } from '@lib_instances/store'
import { themeClient } from '@lib_instances/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { useGetAccessToken } from '@features/auth/get_access_token'
import { useLogoutIfAccessTokenRemoved } from '@features/auth/log_out'
import { GlobalStyles } from './GlobalStyles'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import './signalsDevTools'
import '@shared/utils/cursorPos'

export const App = (): JSX.Element => {
  useGetAccessToken({ withLoadingState: false })
  useLogoutIfAccessTokenRemoved()

  return (
    <Provider store={store}>
      <QueryClientProvider client={reactQuery}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <RouterProvider router={router} />
          <ReactQueryDevtools />
          <ReactQueryDevtoolsProductionHidden />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
