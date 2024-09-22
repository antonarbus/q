import { reactQuery } from '@lib_instances/reactQuery'
import { router } from '@lib_instances/router'
import { store } from '@lib_instances/store'
import { themeClient } from '@lib_instances/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { useLogoutIfAccessTokenRemoved } from '@features/auth/log_out'
import { GlobalStyles } from './GlobalStyles'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import './signalsDevTools'
import '@shared/utils/cursorPosSignal'
import { useHideInitHtmlElements } from '@features/init_load/useHideInitHtmlElements'
import { useOnDragOnDrop } from '@features/upload/useOnDragOnDrop'
import { useRemoveThirdPartyCookies } from '@features/init_load/useRemoveThirdPartyCookies'

export const App = (): React.JSX.Element => {
  useLogoutIfAccessTokenRemoved()
  useHideInitHtmlElements()
  useOnDragOnDrop()
  useRemoveThirdPartyCookies()

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
