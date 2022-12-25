import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@client/credentials/RequireAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Nav } from '@client/nav'
import { Notifier } from '@client/notifier'
import { Login } from '@client/credentials/Login'
import { Register } from '@client/credentials/Register'
import { Reset } from '@client/credentials/Reset'
import { Unauthorized } from '../credentials/Unauthorized'
import { PersistentAuth } from '@client/credentials/PersistentAuth'
import { Main } from './Main'
import { Profile } from '@client/profile/Profile'
import { SpinnerFullPage } from '@client/spinner/SpinnerFullPage'
import { theme } from '@client/theme'
import { GlobalStyles } from '@client/GlobalStyles'

export const App = () => (
  <ThemeProvider theme={createTheme(theme as any)}>
    <GlobalStyles />
    <BrowserRouter>
      <SpinnerFullPage />
      <Nav />
      <Routes>
        <Route path="/*" element={<Main />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<Reset />} />
        </Route>
        <Route element={<PersistentAuth />}>
          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
      <Notifier />
    </BrowserRouter>
  </ThemeProvider>
)
