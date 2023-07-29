import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { reactQuery } from './reactQuery'
import { QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RequireAuth } from 'client/features/credentials/RequireAuth'
import { ThemeProvider } from '@mui/material/styles'
import { themeClient } from './theme'
import { GlobalStyles } from './GlobalStyles'
import { Nav } from 'client/features/nav'
import { Notifier } from 'client/features/notifier'
import { Login } from 'client/features/credentials/Login'
import { Register } from 'client/features/credentials/Register'
import { Reset } from 'client/features/credentials/Reset'
import { Unauthorized } from 'client/features/credentials/Unauthorized'
import { PersistentAuth } from 'client/features/credentials/PersistentAuth'
import { Main } from 'client/features/application/Main'
import { Profile } from 'client/features/profile/Profile'
import { SpinnerFullPage } from 'client/features/spinner/SpinnerFullPage'
import { ReactQueryDevtoolsProductionHidden } from './ReactQueryDevtoolsProductionHidden'
import { Updater } from 'client/features/bottom msg/BottomMsg'
import { store } from './store'
import { Provider } from 'react-redux'

export const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={reactQuery}>
      <ThemeProvider theme={themeClient}>
        <GlobalStyles />
        <BrowserRouter>
          <SpinnerFullPage />
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
          </Routes>
          <Notifier />
          <Updater />
        </BrowserRouter>
        {/* <ReactQueryDevtools /> */}
        <ReactQueryDevtoolsProductionHidden />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
)
