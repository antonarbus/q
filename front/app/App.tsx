import './redux'
import './queryClient'
import './router'
import './axiosWithAuth'
import '@shared/util/cursorPosSignal'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { instance } from '@shared/instance'
import { router } from '@shared/lib/react-router-dom'
import { store } from '@shared/lib/redux'
import { themeClient } from '@shared/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enGB } from 'date-fns/locale'
import type { JSX } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { QueryDevtoolsProductionHidden } from './QueryDevtoolsProductionHidden'

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={instance.queryClient}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <LocalizationProvider
            adapterLocale={enGB}
            dateAdapter={AdapterDateFns}
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
