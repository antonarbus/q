import './router'
import '../shared/lib/tanstack-query/queryClient'
import './axiosConfig'
import { store } from './redux'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { instance } from '@front/shared/instance'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { themeClient } from '@front/shared/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enGB } from 'date-fns/locale'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { QueryDevtoolsProductionHidden } from '../shared/lib/tanstack-query/QueryDevtoolsProductionHidden'

export const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={instance.queryClient}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <LocalizationProvider
            adapterLocale={enGB}
            dateAdapter={AdapterDateFns}
          >
            <RouterProvider router={routerHolder.router} />
          </LocalizationProvider>
          {import.meta.env.DEV ? <ReactQueryDevtools /> : null}
          {import.meta.env.PROD ? <QueryDevtoolsProductionHidden /> : null}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
