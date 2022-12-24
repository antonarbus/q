import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@src/credentials/RequireAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Nav } from '@src/nav'
import { Notifier } from '@src/notifier'
import { Login } from '@src/credentials/Login'
import { Register } from '@src/credentials/Register'
import { Reset } from '@src/credentials/Reset'
import { Unauthorized } from '../credentials/Unauthorized'
import { PersistentAuth } from '@src/credentials/PersistentAuth'
import { Main } from './Main'
import { Profile } from '@src/profile/Profile'
import { SpinnerFullPage } from '@src/spinner/SpinnerFullPage'
import { theme } from '@src/theme'
import { GlobalStyles } from '@src/GlobalStyles'

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
