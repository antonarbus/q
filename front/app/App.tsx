import './redux'
import './queryClient'
import './router'
import './axiosWithAuth'
import '@shared/utils/cursorPosSignal'
import { themeClient } from '@shared/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { QueryDevtoolsProductionHidden } from './QueryDevtoolsProductionHidden'
import { instance } from '@shared/instance'
import { store } from '@shared/lib/redux'
import { router } from '@shared/lib/router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from 'date-fns/locale'

export const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={instance.queryClient}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <RouterProvider router={router} />
          </LocalizationProvider>
          <ReactQueryDevtools />
          <QueryDevtoolsProductionHidden />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
