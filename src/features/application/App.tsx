import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@features/credentials/RequireAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '../../GlobalStyles'
import { theme } from '../../theme'
import { Nav } from '@features/nav'
import { Notifier } from '@features/notifier'
import { Login } from '@features/credentials/Login'
import { Register } from '@features/credentials/Register'
import { Reset } from '@features/credentials/Reset'
import { Test } from '@features/temp/Test'
import { Unauthorized } from '../credentials/Unauthorized'
import { LoadingFullPage } from './LoadingFullPage'
import { useSelectorTyped } from '@src/store'
import { PersistentAuth } from '@features/credentials/PersistentAuth'
import { Main } from './Main'
import { useRefreshTokens } from '@features/credentials/useRefreshTokens'

export const App = () => {
  useRefreshTokens({ withLoadingState: false })
  const isLoading = useSelectorTyped(state => state.application.isLoading)

  return (
    <ThemeProvider theme={createTheme(theme as any)}>
      <GlobalStyles />
      <BrowserRouter>
        {isLoading && <LoadingFullPage />}
        <Nav />
        <Routes>
          <Route path="/*" element={<Main />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="reset" element={<Reset />} />
          </Route>
          <Route element={<PersistentAuth />}>
            <Route element={<RequireAuth allowedRoles={['user']} />}>
              <Route path="test" element={<Test />} />
            </Route>
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
        <Notifier />
      </BrowserRouter>
    </ThemeProvider>
  )
}
