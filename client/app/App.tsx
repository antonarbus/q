import '@shared/lib/nonPassiveEventErrorFix'
import { reactQuery } from '@lib_instances/reactQuery'
import { store } from '@lib_instances/store'
import { themeClient } from '@lib_instances/theme'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BarChart } from '@pages/chart/Chart'
import { Profile } from '@pages/profile'
import { Login, PersistentAuth, Register, RequireAuth, Reset, Unauthorized } from '@widgets/credentials'
import { Nav } from '@widgets/nav'
import { Spinner } from '@entities/spinner'
import { TopMsg } from '@shared/ui/top_msg'
import { GlobalStyles } from './GlobalStyles'
import { Main } from './Main'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'

export const App = (): JSX.Element => (
  <Provider store={store}>
    <QueryClientProvider client={reactQuery}>
      <ThemeProvider theme={themeClient}>
        <GlobalStyles />
        <BrowserRouter>
          <TopMsg />
          <Spinner />
          <Nav />
          <Routes>
            <Route path='/*' element={<Main />}>
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='reset' element={<Reset />} />
            </Route>
            <Route element={<PersistentAuth />}>
              <Route element={<RequireAuth allowedRoles={['user']} />}>
                <Route path='profile' element={<Profile />} />
                <Route path='settings' element={<div>Settings</div>} />
              </Route>
            </Route>
            <Route path='unauthorized' element={<Unauthorized />} />
            <Route path='chart' element={<BarChart />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
        <ReactQueryDevtoolsProductionHidden />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
)
