import { initRouter } from './router'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { initRedux } from './redux'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { initAxios } from './axiosConfig'
import { queryClient } from '@front/shared/lib/tanstack-query/queryClient'
import { QueryDevtoolsProductionHidden } from '@front/shared/lib/tanstack-query/QueryDevtoolsProductionHidden'
import { themeClient } from '@front/shared/theme'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enGB } from 'date-fns/locale'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'

initRedux()
initRouter()
initAxios()

export const App = (): React.JSX.Element => {
  return (
    <Provider store={reduxHolder.store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themeClient}>
          <GlobalStyles />
          <LocalizationProvider adapterLocale={enGB} dateAdapter={AdapterDateFns}>
            <RouterProvider router={routerHolder.router} />
          </LocalizationProvider>
          {import.meta.env.DEV ? <ReactQueryDevtools /> : null}
          {import.meta.env.PROD ? <QueryDevtoolsProductionHidden /> : null}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
