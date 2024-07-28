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
import { useEffectOnce } from 'react-use'

export const App = (): JSX.Element => {
  useLogoutIfAccessTokenRemoved()

  useEffectOnce(() => {
    const seoElement = document.getElementById('seo')

    if (seoElement instanceof Element) {
      seoElement.style.display = 'none'
    }
  })

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
