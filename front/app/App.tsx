import './router'
import './reactQuery'
import './axiosWithAuth'
import './signalsDevTools'
import '@shared/utils/cursorPosSignal'
import { store } from '@lib_instances/store'
import { themeClient } from '@shared/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { useLogoutIfAccessTokenExpired } from '@features/auth/log_out'
import { GlobalStyles } from './GlobalStyles'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import { useHideInitHtmlElements } from '@features/init_load/useHideInitHtmlElements'
import { useOnDragOnDrop } from '@features/upload/useOnDragOnDrop'
import { useRemoveThirdPartyCookies } from '@features/init_load/useRemoveThirdPartyCookies'
import { instance } from '@shared/instance'

export const App = (): React.JSX.Element => {
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useOnDragOnDrop()
  useRemoveThirdPartyCookies()

  return (
    <Provider store={store}>
      <QueryClientProvider client={instance.reactQuery}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <RouterProvider router={instance.router} />
          <ReactQueryDevtools />
          <ReactQueryDevtoolsProductionHidden />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
