import './redux'
import './reactQuery'
import './router'
import './axiosWithAuth'
import './signalsDevTools'
import '@shared/utils/cursorPosSignal'
import { themeClient } from '@shared/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import { instance } from '@shared/instance'
import { store } from '@shared/lib/redux'
import { router } from '@shared/lib/router'

export const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={instance.reactQuery}>
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
