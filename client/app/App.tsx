import '@shared/lib/nonPassiveEventErrorFix'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { reactQuery } from './reactQuery'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@mui/material/styles'
import { themeClient } from './theme'
import { GlobalStyles } from './GlobalStyles'
import { Nav } from '@widgets/nav'
import { TopMsg } from '@shared/ui/top_msg'
import { Main } from '@app/Main'
import { Profile } from '@pages/profile'
import { store } from './store'
import { Provider } from 'react-redux'
import { BottomMsg } from '@widgets/bottom_msg'
import { Spinner } from '@widgets/spinner'
import { Login, PersistentAuth, Register, RequireAuth, Reset, Unauthorized } from '@widgets/credentials'
import { BarChart } from '@pages/chart/Chart'

export const App = (): JSX.Element => (
  <Provider store={store}>
    <QueryClientProvider client={reactQuery}>
      <ThemeProvider theme={themeClient}>
        <GlobalStyles />
        <BrowserRouter>
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
          <TopMsg />
          <BottomMsg />
        </BrowserRouter>
        <ReactQueryDevtools />
        <ReactQueryDevtoolsProductionHidden />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
)
